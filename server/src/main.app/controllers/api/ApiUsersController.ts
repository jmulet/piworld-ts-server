import { validate } from 'class-validator';
import * as express from 'express';
import { Body, Controller, Delete, Get, Post, QueryParam, Req, Res, Session, UseBefore, Redirect, Param } from 'routing-controllers';
import { Inject } from 'typedi';

 
  
import { DecryptBodyMdw } from '../../middlewares/DecryptBodyMdw';
 
import { SchoolModel } from '../../entities/SchoolModel';
import { AuthenticatedMdw } from '../../middlewares/AuthenticatedMdw';
import { AdminsOnly, AdminsAndTeachersOnly } from '../../middlewares/AuthorizedMdw';
import { SchoolSrv } from '../../services/SchoolSrv';
import { SessionSrv } from '../../services/SessionSrv';
import { SessionModel } from '../../model/SessionModel';
import { UserRoles } from '../../entities/UserModel';
import { UserModel } from '../../entities/UserModel';
import { UsersImportModel } from '../../model/UsersImportModel';
import { UserSrv } from '../../services/UserSrv';
import { config } from '../../../server.config';
import { PwHttpServer } from '../../../server';
import * as bcrypt from 'bcrypt';

const io = PwHttpServer.getInstance().io;

@Controller("/api/user")
@UseBefore(AuthenticatedMdw)
export class ApiUsersController {

    @Inject()
    userSrv: UserSrv;

    @Inject()
    sessionSrv: SessionSrv;

    @Post("/auth")
    @UseBefore(DecryptBodyMdw)
    usersAuth( @Session() session: SessionModel, @Req() request: express.Request) {
        return this.sessionSrv.checkPassword(session, request.body.password);
    }

    @Get("/logout")
    @UseBefore(AuthenticatedMdw)
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
        return {url: config.basePrefix+"/login.htm?logout"};
    }
    
    @Get("/list")
    @UseBefore(AdminsAndTeachersOnly)
    usersList( @Session() session: SessionModel, @QueryParam("filter") filter: string, @QueryParam("idSchool") schoolId: number,
    @QueryParam("offspring") offspring: number) {
        if (!this.sessionSrv.isRoot(session)) {
            // Teachers can only access their schoolId
            schoolId = session.user.idSchool;
        }
        // Must return the list of offspring (specially for parents)
        return this.userSrv.findBySchoolId(schoolId, filter, offspring);
    }


    @Post("/")
    @UseBefore(AdminsAndTeachersOnly)
    async userSave( @Session() session: SessionModel, @Body({ validate: true }) entity: UserModel, @Res() response: express.Response) {
        const sessionUser = session.user;
        if (sessionUser.idRole === UserRoles.admin ||
            (sessionUser.idSchool === entity.idSchool)) {
            // Passwords must be encrypted
            if (entity.password && entity.idRole < UserRoles.student) {                 
                entity.password = await bcrypt.hash(entity.password, 10);
            }
            return this.userSrv.save(entity);
        } else {
            return response.status(400).send({ msg: "You can only edit users of your schoolId." });
        }
    }
 

    @Post("/import")
    @UseBefore(AdminsAndTeachersOnly)
    async usersImport( @Session() session: SessionModel, @Body() usersImportModel: UsersImportModel, @Res() response: express.Response) {
        const sessionUser = session.user;
        if (!usersImportModel.idSchool) {
            usersImportModel.idSchool = sessionUser.idSchool;
        }

        const { parsed, logErrors } = usersImportModel.parse();
        let promises = []; 
        // First step is to validate UserModels
        parsed.forEach(async (user) => {
            promises.push(validate(user));
        });
        const validationResults = await Promise.all(promises);

        // Second step is to see if users exists in database
        promises = [];
        parsed.forEach(async (user) => {
            promises.push(this.userSrv.findByUsername(user.username));
        });
        const findResults = await Promise.all(promises);

        // Finally do whatever you can with the previous results
        promises = []
        parsed.forEach(async (user, index) => {
            logErrors.push(">>> Index " + index + " " + JSON.stringify(user));
            const errors: any[] = validationResults[index];
            if (errors.length > 0) {

                const msg = "[!] Validation failed. errors: " + errors.map(e => JSON.stringify(e.constraints)).join("; ");
                logErrors.push('<span style="color:red">' + msg + '</span>');
            }

            if (sessionUser.idRole === UserRoles.admin ||
                (sessionUser.idSchool === user.schoolId)) {
                const found = findResults[index];
                if (found) {
                    if (usersImportModel.updateIfExists) {
                        found.fullname = user.fullname;
                        if (user.email) {
                            found.email = user.email;
                        }
                        if (user.phone) {
                            found.phone = user.phone;
                        }
                        promises.push(this.userSrv.save(found));
                    } else {
                        logErrors.push('<span style="color:red">[!] This user already exists:: </span>');
                    }
                } else if (errors.length === 0) {
                    promises.push(this.userSrv.save(user));
                }
            } else {
                logErrors.push("[!] You can only import users to your schoolId:: " + JSON.stringify(user));
            }
        });


        const all = await Promise.all(promises);

        all.forEach((item) => {
            if (item.changed) {
                logErrors.push('<span style="color:green"> [U]: ' + JSON.stringify(item) + '</span>');
            } else if (item.id) {
                logErrors.push('<span style="color:blue"> [C]: ' + JSON.stringify(item) + '</span>');
            } else {
                logErrors.push("[?]: " + item);
            }
        });
        return logErrors;
    }

    @Delete("/:idUser")
    @UseBefore(AdminsOnly)
    async userDelete( @Session() session: SessionModel, @Param("idUser") idUser: number, @Res() response: express.Response) {

        const sessionUser = session.user;
        const user = await this.userSrv.findById(idUser);
        if (!user) {
            return response.status(400).send({ msg: "User " + idUser + " does not exist." });
        }
        if (sessionUser.idRole === UserRoles.admin ||
            (sessionUser.idSchool === user.idSchool)) {
            await this.userSrv.delete(user);
            return response.status(200).send(user);
        } else {
            return response.status(400).send({ msg: "Admins can only delete users of their schoolId." });
        }
    }

}

