import * as express from 'express';
import { request } from 'http';
import { Controller, Get, Post, QueryParam, Redirect, Render, Req, Res, Session, UseBefore, Body } from 'routing-controllers';
import { Inject } from 'typedi';

import { LoginsModel } from '../entities/LoginsModel';
import { UserModel, UserRoles } from '../entities/UserModel';
import { AuthenticatedMdw } from '../middlewares/AuthenticatedMdw';
import { cookieParser } from '../utils/CookieParser';
import { AnonymousOnlyMdw } from '../middlewares/AnonymousOnlyMdw';
import { TranslationMdw } from '../middlewares/TranslationMdw';
import { SessionModel } from '../model/SessionModel';
import { EnrollSrv } from '../../classroom.app/services/GroupEnrollSrv';
import { LoginsSrv } from '../services/LoginsSrv';
import { SessionSrv } from '../services/SessionSrv';
import { UserSrv } from '../services/UserSrv';
import { config } from '../../server.config';

import * as bcrypt from "bcrypt";
import { I18n } from '../services/I18n';
import { DecryptBodyMdw } from '../middlewares/DecryptBodyMdw';
import { PwHttpServer } from '../../server';

const io = PwHttpServer.getInstance().io;

@Controller()
export class LoginController {

    @Inject()
    userSrv: UserSrv;

    @Inject()
    sessionSrv: SessionSrv;

    @Inject()
    loginsSrv: LoginsSrv;

    @Inject()
    enrollSrv: EnrollSrv;

    @Inject()
    i18n: I18n;

    @Get("/")
    @UseBefore(AnonymousOnlyMdw)
    @Redirect(config.basePrefix+"/login.htm")
    indexPage() {
    }

    @Get("/login.htm")
    @UseBefore(AnonymousOnlyMdw)
    @UseBefore(TranslationMdw)
    @Render("login")
    loginPage(@QueryParam("logout") msg: any, @Res() response: any) {
        return {
            errCode: "",
            msg: msg != null ? response.locals.translations["THANK_YOU"] : ""
        }
    }

    @Post("/login.htm")
    @UseBefore(DecryptBodyMdw)
    @UseBefore(TranslationMdw)
    async login(@Body({required: true}) credentials: any, @Req() request: express.Request, @Res() response: express.Response, @Session() session) {
        
        const ipAddr = request.headers['x-forwarded-for'] || request.headers['x-real-ip'] || request.connection.remoteAddress;
 
        if(credentials.rememberme){
            request.session.cookie.maxAge = null;
            request.session.cookie.expires = false;
        }

        try {
            credentials.parents = parseInt(credentials.parents);
        } catch (Ex) {
            credentials.parents = 0;
        }

        let user: UserModel;
        try {
            user = await this.userSrv.findByUsername(credentials.username, ["password"]);
        } catch (Ex) {
            console.log(Ex);
            return {errCode: "INVALID_USER"};
        }
 
        if (user) {
            const password = user.password;
            let correctPassword = false;
    
            // Assume that non-student's password are always encrypted in database
            if (user.idRole < UserRoles.student) {              
                correctPassword = await bcrypt.compare(credentials.password, password);
            } else {
                correctPassword = (password === credentials.password);
            }

            if (correctPassword) {
                if (!user.valid) {
                    return {errCode: "DISABLED_USER"};
                }

                // load session data
                const connectSid = cookieParser(request)[config.basePrefix+"pwsid"];
                const parents = credentials.parents ? 1 : 0;
                const logins = LoginsSrv.fromData(user.id, ipAddr + '', new Date(), parents);
                await this.loginsSrv.save(logins); 

                session.connectSid = connectSid || session.id;
                session.user = user;
                session.logins = logins; 
               
                if (user.mustChgPwd) {
                    return {redirect: "/changepwd.htm"};
                }

            } else {
                return {errCode: "INVALID_PASSWORD"};
            }

        } else {
            return {errCode: "INVALID_USER"};
        }

        // Try to find app's path
        
        let path;
        if (credentials.app) {
            const list = PwHttpServer.getInstance().getInstalledApps().filter( (e) => {
                return e.config.name.toLowerCase() === credentials.app.toLowerCase();
            });
            if (list.length) {
                path = list[0].config.path;
            }            
        }

        const prefixUrl = response.locals.prefixUrl;
        let redirect;
        if (path){
             redirect = prefixUrl("/" + path);
        } else if (request.body.path) {
            redirect = request.body.path;
        } else {
            if (this.sessionSrv.isRoot(session)){
                redirect = "?app=admin";
            } else {
                redirect = "";
            }
        }
  
        return {redirect: prefixUrl("/desktop.htm") + redirect};
    }

    @Post("/logout")
    @UseBefore(AuthenticatedMdw)
    @Redirect(config.basePrefix+"/login.htm?logout")
    async logout(@Req() request: any, @Session() session) {
        try {
            await this.sessionSrv.logout(session);
            const ns = io.of('/');
            if (session.currentSocketId) {
                // get current socket object              
                const socket = ns.connected[session.currentSocketId];           
                // do something with it
                console.log("current socket", socket);     
            }
            const u = {
                id: session.user.id,
                username: session.user.username,
                fullname: session.user.fullname,
                totalConnected: Object.keys(ns.connected).length
            }
            io.sockets.emit("usersLogedout", u);
        } catch (Ex) {
            console.log(Ex);
        }
        delete session.connectSid;
        delete session.user;
        delete session.logins;
        delete session.enrolls;
        delete session.uopts;
        session.destroy();
    }

    @Get("/changepwd.htm")
    @UseBefore(AuthenticatedMdw)
    @UseBefore(TranslationMdw)
    @Render("changepwd")
    changePwdPage( @QueryParam("error") error: number) {
        let errCode = "";
        if (error === 1) {
            errCode = "PASSWORD_MISMATCH";
        } else if (error === 2) {
            errCode = "PASSWORD_MINLENGTH";
        } else if (error === 3) {
            errCode = "PASSWORD_WRONG";
        } else if (error === 4) {
            errCode = "PASSWORD_DIFFERENT";
        }
        return { errCode: errCode };
    }

    @Post("/changepwd.htm")
    @Redirect(config.basePrefix+"/desktop.htm")
    @UseBefore(AuthenticatedMdw)
    @UseBefore(TranslationMdw)
    async changePwd(@Body({required: true}) passwords: any,
      @Req() request: express.Request, @Session() session: SessionModel) {
        const password0 =passwords.password0;
        const password =passwords.password;
        const password2 =passwords.password2;

        if (password0 !== session.user.password) {
            return config.basePrefix + "/changepwd.htm?error=3";
        }      
        else if (password !== password2) {
            return config.basePrefix + "/changepwd.htm?error=1";
        }
        else if (password.length < 4) {
            return config.basePrefix + "/changepwd.htm?error=2";
        }
        else if (password0 === password) {
            return config.basePrefix + "/changepwd.htm?error=4";
        }

        await this.sessionSrv.changePassword(session, password);
    }

    @Get("/translate")
    getTranslations(@QueryParam("file", {required: true}) file: string, @QueryParam("lang") lang: string, 
        @Req() request: express.Request, @Res() response: express.Response) {
       
        if (!lang) {
            if(request.headers.cookie) {
                // Second check for a lang cookie
                lang = (cookieParser(request, "clang") || "").toLowerCase();
                if (I18n.SUPPORTED_LANGS.indexOf(lang) < 0) {
                    lang = null;
                }
            }
            if (!lang) {
                // Finally, look for request header
                lang = (request.acceptsLanguages(I18n.SUPPORTED_LANGS) || I18n.DEFAULT_LANG).toLowerCase();                                     
            } 
        }
        if (I18n.SUPPORTED_LANGS.indexOf(lang) < 0) {
            lang = I18n.DEFAULT_LANG;
        }        
        const translations = this.i18n.generate("/"+file, lang);
        let jsFile = "var translations = "+ JSON.stringify(translations);
        jsFile += ";\n\nvar __ = function(key) {\n";
        jsFile +="  return translations[key] || key;\n";
        jsFile +="};\n";

        response.setHeader("content-type", "text/javascript");
        return response.send(jsFile);
    }
}