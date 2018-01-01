import { SessionHandler } from "../services/SessionHandler";
import { CookieOptions } from "express";
import { UserModel } from "../entities/UserModel";
import { Logins } from "../entities/LoginsModel";
import { Enroll } from "../entities/EnrollModel";

export interface SessionModel {
    cookie: CookieOptions
    connectSid: string,
    user: UserModel,
    uopts: any,
    logins: Logins,
    enrolls: Enroll[]
}