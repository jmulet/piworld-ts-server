import { validate } from 'class-validator';
import * as express from 'express';
import { Body, Controller, Delete, Get, Post, QueryParam, Req, Res, Session, UseBefore } from 'routing-controllers';
import { Inject } from 'typedi';

 
  
import { DecryptBodyMdw } from '../../../main.app/middlewares/DecryptBodyMdw';
 
import { SchoolModel } from '../../../main.app/entities/SchoolModel';
import { AuthenticatedMdw } from '../../../main.app/middlewares/AuthenticatedMdw';
import { AdminsOnly, AdminsAndTeachersOnly } from '../../../main.app/middlewares/AuthorizedMdw';
import { SchoolSrv } from '../../../main.app/services/SchoolSrv';
import { SessionSrv } from '../../../main.app/services/SessionSrv';
import { SessionModel } from '../../../main.app/model/SessionModel';
import { UserRoles } from '../../../main.app/entities/UserModel';
import { UserModel } from '../../../main.app/entities/index';
import { UsersImportModel } from '../../../main.app/model/UsersImportModel';
import { UserSrv } from '../../../main.app/services/UserSrv';



@Controller("/api/users")
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

    @Get("/list")
    @UseBefore(AdminsAndTeachersOnly)
    usersList( @Session() session: SessionModel, @QueryParam("showStudents") showStudents: boolean, @QueryParam("schoolId") schoolId: number) {
        if (!this.sessionSrv.isRoot(session)) {
            // Teachers can only access their schoolId
            schoolId = session.user.schoolId;
        }
        return this.userSrv.findBySchoolId(schoolId, showStudents);
    }


    @Post("/save")
    @UseBefore(AdminsAndTeachersOnly)
    async userSave( @Session() session: SessionModel, @Body({ validate: true }) user: UserModel, @Res() response: express.Response) {
        const sessionUser = session.user;
        if (sessionUser.idRole === UserRoles.admin ||
            (sessionUser.schoolId === user.schoolId)) {
            return this.userSrv.save(user);
        } else {
            return response.status(400).send({ msg: "You can only edit users of your schoolId." });
        }
    }

    @Post("/import")
    @UseBefore(AdminsAndTeachersOnly)
    async usersImport( @Session() session: SessionModel, @Body() usersImportModel: UsersImportModel, @Res() response: express.Response) {
        const sessionUser = session.user;
        if (!usersImportModel.schoolId) {
            usersImportModel.schoolId = sessionUser.schoolId;
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
                (sessionUser.schoolId === user.schoolId)) {
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

    @Delete("/delete")
    @UseBefore(AdminsOnly)
    async userDelete( @Session() session: SessionModel, @QueryParam("idUser") idUser: number, @Res() response: express.Response) {

        const sessionUser = session.user;
        const user = await this.userSrv.findById(idUser);
        if (!user) {
            return response.status(400).send({ msg: "User " + idUser + " does not exist." });
        }
        if (sessionUser.idRole === UserRoles.admin ||
            (sessionUser.schoolId === user.schoolId)) {
            await this.userSrv.delete(user);
            return response.status(200).send(user);
        } else {
            return response.status(400).send({ msg: "Admins can only delete users of their schoolId." });
        }
    }

}

