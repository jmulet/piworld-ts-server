import { Container } from 'typedi/Container';

import { EnrollModel } from '../entities/classroom/GroupsEnrollModel';
import { LoginsModel } from '../entities/LoginsModel';
import { UserModel, UserRoles } from '../entities/UserModel';
import { EnrollSrv } from '../../classroom.app/services/GroupEnrollSrv';
import { LoginsSrv } from './LoginsSrv';
import { UserSrv } from './UserSrv';

  
export class SessionHandler {
    connectSid: string;
    private static sessionHolder = {};
    private uopts: any;
    private parents: 0 | 1;
    private ip: string;

    private loginsSrv: LoginsSrv;
    private userSrv: UserSrv;
    private enrollSrv: EnrollSrv;

    private user: UserModel;
    private logins: LoginsModel;
    private enrolls: EnrollModel[];

    private constructor(connectSid: string, user: UserModel, ip: string, parents: 0 | 1) {
        this.loginsSrv = Container.get(LoginsSrv);
        this.userSrv = Container.get(UserSrv);
        this.enrollSrv = Container.get(EnrollSrv);
        this.connectSid = connectSid;
        this.user = user;
        this.ip = ip;
        this.parents = parents;

        // Parse user options
        try {
            this.uopts = JSON.parse(this.user.uopts);
        } catch(Ex){
            this.uopts = {};
            console.log(Ex);
        }
    }

    static set(connectSid: string, instance: SessionHandler) {
        SessionHandler.sessionHolder[connectSid] = instance;
    }

    static get(connectSid: string) {
        return SessionHandler.sessionHolder[connectSid];
    }
     
    static async init( connectSid: string, user: UserModel, ip: string, parents: 0 | 1) {
        const handler = new SessionHandler( connectSid, user, ip, parents);
        handler.logins = LoginsModel.fromData(user.id, ip, new Date(), parents);
        await handler.loginsSrv.save(handler.logins);
        handler.enrolls = await handler.enrollSrv.list(user.id);
        SessionHandler.sessionHolder[connectSid] = handler;
        return handler;
    }
     

    getEnrolls(): EnrollModel[] {
        return this.enrolls;
    }

    async reloadEnrolls() {
        this.enrolls = await this.enrollSrv.list(this.user.id);
    }

    getRole(): number {
        return this.user.idRole;
    }

    getUopts(): any {
        return this.uopts;
    }

    setUopts(uopts: any) {
        this.user.uopts = JSON.parse(uopts);
        return this.userSrv.save(this.user);
    }

    isAdmin(): boolean {
        return ( this.user.idRole === UserRoles.admin ||  
                 this.user.idRole === UserRoles.teacher_admin );
    }

    isTeacher(): boolean {
        return ( this.user.idRole === UserRoles.teacher ||  
                 this.user.idRole === UserRoles.teacher_admin || 
                 this.user.idRole === UserRoles.teacher_nonediting );
    }

    isParents(): boolean {
        return this.logins.parents? true : false;
    }

    isUserValid(): boolean {
        return this.user.valid? true: false;
    }

    mustChangePassword(): boolean {
        return this.user.mustChgPwd? true: false;
    }

    logout() {
        //This is strange:: timestamp is converted to string in entity???
        //Solved by adding isDate() decorator
        //this.logins.login = new Date(this.logins.login);
        this.logins.logout = new Date();
        delete SessionHandler.sessionHolder[this.connectSid];
        return this.loginsSrv.save(this.logins); 
    }

    getUser() {
        return this.user;
    }

    getIdLogin() {
        return this.logins.id;
    }

    changeUserProperty(key: "password" | "passwordParents" | "email" | "emailParents" | "emailPassword", value: string) {
        this.user[key] = value;
        return this.userSrv.save(this.user);
    }

    changePassword(newPassword: string) {       
        if(this.parents === 0) {
            this.user.mustChgPwd = 0;
        }
        return this.changeUserProperty(this.parents? 'passwordParents': 'password', newPassword);
    }
    
    changeEmail(newEmail: string) {       
        return this.changeUserProperty(this.parents? 'emailParents': 'email', newEmail);
    }

}