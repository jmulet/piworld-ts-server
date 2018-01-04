import { Service, Inject } from "typedi";
import { UserSrv } from "./UserSrv";
import { SessionModel } from "../model/SessionModel";
import { UserRoles } from "../entities/UserModel";
import { LoginsSrv } from "./LoginsSrv";

import { config } from "../server.config";
import * as bcrypt from "bcrypt";

@Service()
export class SessionSrv {
    @Inject()
    loginsSrv: LoginsSrv;

    @Inject()
    userSrv: UserSrv;

    isAdmin(session: SessionModel): boolean {
        return ( session.user.idRole === UserRoles.admin ||  
                session.user.idRole === UserRoles.teacher_admin );
    }

    isRoot(session: SessionModel): boolean {
        return ( session.user.idRole === UserRoles.admin );
    }

    isTeacher(session: SessionModel): boolean {
        return ( session.user.idRole === UserRoles.teacher ||  
                 session.user.idRole === UserRoles.teacher_admin || 
                 session.user.idRole === UserRoles.teacher_nonediting );
    }

    isParents(session: SessionModel): boolean {
        return session.logins.parents? true : false;
    }

    isUserValid(session: SessionModel): boolean {
        return session.user.valid? true: false;
    }

    mustChangePassword(session: SessionModel): boolean {
        return session.user.mustChgPwd? true: false;
    }

    logout(session: SessionModel) {
        //session is strange:: timestamp is converted to string in entity???
        //Solved by adding isDate() decorator
        //session.logins.login = new Date(session.logins.login);
        session.logins.logout = new Date(); 
        return this.loginsSrv.save(session.logins); 
    }

    getUser(session: SessionModel) {
        return session.user;
    }

    getIdLogin(session: SessionModel) {
        return session.logins.id;
    }

    changeUserProperty(session: SessionModel, key: "password" | "passwordParents" | "email" | "emailParents" | "emailPassword", value: string) {
        session.user[key] = value;
        return this.userSrv.save(session.user);
    }

    async changePassword(session: SessionModel, newPassword: string) {       
        if(session.logins.parents === 0) {
            session.user.mustChgPwd = 0;
        }
        // Admin's password is encrypted
        if (session.user.username === config.admin.username) {
            session.user.password = await bcrypt.hash(session.user.password, 10);
        }
        return this.changeUserProperty(session, session.logins.parents? 'passwordParents': 'password', newPassword);
    }
    
    changeEmail(session: SessionModel, newEmail: string) {       
        return this.changeUserProperty(session, session.logins.parents? 'emailParents': 'email', newEmail);
    }

    async checkPassword(session: SessionModel, password: string) {       
        const key = session.logins.parents? 'passwordParents': 'password';
        // Comparison is different depending if database password is encrypted
        if (session.user.username === config.admin.username) {
            return bcrypt.compare(session.user.password, password);
        } else {
            return session.user[key] === password;
        }
        
    }

}