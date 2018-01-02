import * as express from 'express';
import { request } from 'http';
import { Controller, Get, Post, QueryParam, Redirect, Render, Req, Res, Session, UseBefore } from 'routing-controllers';
import { Inject } from 'typedi';

import { LoginsModel } from '../entities/LoginsModel';
import { UserModel } from '../entities/UserModel';
import { AuthenticatedMdw } from '../middlewares/AuthenticatedMdw';
import { cookieParser } from '../middlewares/CookieParser';
import { LoginMdw } from '../middlewares/LoginMdw';
import { TranslationMdw } from '../middlewares/TranslationMdw';
import { SessionModel } from '../model/SessionModel';
import { EnrollSrv } from '../services/EnrollSrv';
import { LoginsSrv } from '../services/LoginsSrv';
import { SessionSrv } from '../services/SessionSrv';
import { UserSrv } from '../services/UserSrv';
import { config } from '../server.config';

import * as bcrypt from "bcrypt";
import { I18n } from '../services/I18n';


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
    @UseBefore(LoginMdw)
    @Redirect("login.htm")
    indexPage() {
    }

    @Get("/login.htm")
    @UseBefore(LoginMdw)
    @UseBefore(TranslationMdw)
    @Render("login")
    loginPage(@QueryParam("logout") msg: any, @Res() response: any) {
        return {
            errCode: "",
            msg: msg != null ? response.locals.translations["THANK_YOU"] : ""
        }
    }

    @Post("/login.htm")
    @UseBefore(TranslationMdw)
    async postLogin(@Req() request: express.Request, @Session() session) {

        
        const ipAddr = request.headers['x-forwarded-for'] || request.headers['x-real-ip'] || request.connection.remoteAddress;

        const credentials = request.body;

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
            user = await this.userSrv.findByUsername(credentials.username);
        } catch (Ex) {
            console.log(Ex);
            return {errCode: "INVALID_USER"};
        }
 
        if (user) {
            const password = credentials.parents? user.passwordParents : user.password;
            let correctPassword = false;
    
            // Assume that admin password is always encrypted in database
            if (credentials.username === config.admin.username) {
                correctPassword = await bcrypt.compare(credentials.password, password);
            } else {
                correctPassword =  (password === credentials.password);
            }

            if (correctPassword) {
                if (!user.valid) {
                    return {errCode: "DISABLED_USER"};
                }

                // load session data
                const connectSid = cookieParser(request)["pwsid"];
                const parents = credentials.parents ? 1 : 0;
                const logins = LoginsModel.fromData(user.id, ipAddr + '', new Date(), parents);
                await this.loginsSrv.save(logins);
                const enrolls = await this.enrollSrv.list(user.id);
                
                session.connectSid = connectSid;
                session.user = user;
                session.logins = logins;
                session.enrolls = enrolls;
                try {
                    session.uopts = JSON.parse(user.uopts);
                } catch(Ex){
                    console.log(Ex);
                    session.uopts = {};
                }

                if (user.mustChgPwd) {
                    return {redirect: "/changepwd.htm"};
                }

            } else {
                return {errCode: "INVALID_PASSWORD"};
            }

        } else {
            return {errCode: "INVALID_USER"};
        }

        return {redirect: "/desktop.htm"};
    }

    @Post("/logout")
    @UseBefore(AuthenticatedMdw)
    @Redirect("login.htm?logout")
    async logout(@Req() request: any, @Session() session) {
        try {
            await this.sessionSrv.logout(session);
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
    changePwd( @QueryParam("error") error: number) {
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
    @Redirect("/desktop.htm")
    @UseBefore(AuthenticatedMdw)
    @UseBefore(TranslationMdw)
    async changePwdPost( @Req() request: express.Request, @Session() session: SessionModel) {
        const pwd0 = request.body.password0;
        const pwd = request.body.password;
        const pwd2 = request.body.password2;
        
        if (pwd0 !== session.user.password) {
            return "/changepwd.htm?error=3";
        }      
        else if (pwd !== pwd2) {
            return "/changepwd.htm?error=1";
        }
        else if (pwd.length < 4) {
            return "/changepwd.htm?error=2";
        }
        else if (pwd0 === pwd) {
            return "/changepwd.htm?error=4";
        }

        await this.sessionSrv.changePassword(session, pwd);
    }

    @Get("/translate")
    translateGet(@QueryParam("file") file: string, @QueryParam("lang") lang: string, 
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