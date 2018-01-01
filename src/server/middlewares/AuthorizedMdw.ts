import * as express from "express";
import { UserModel } from "../entities/UserModel";


export function AuthorizedMdw(roles: number[]) {
  
    return function(request: express.Request, response: express.Response, next?: (err?: any) => any, ): any {        
        const user: UserModel = request.session.user;
        if (user) {
            const role = user.idRole;
            if (roles.indexOf(role) < 0) {
                console.log("Sorry! Unauthorized access to route " + request.path);
                return response.redirect("/errors/403.htm");
            }
        }
        next();
    }

}