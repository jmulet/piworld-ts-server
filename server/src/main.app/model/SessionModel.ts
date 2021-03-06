import { SessionHandler } from "../services/SessionHandler";
import { CookieOptions } from "express";
import { UserModel } from "../entities/UserModel";
import { LoginsModel } from "../entities/LoginsModel"; 

export interface SessionModel {
    cookie: CookieOptions
    connectSid: string,
    user: UserModel,
    uopts: any,
    logins: LoginsModel 
}