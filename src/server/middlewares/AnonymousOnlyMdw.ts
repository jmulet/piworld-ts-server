import { ExpressMiddlewareInterface } from "routing-controllers";
import { SessionModel } from "../model/SessionModel";
import { config } from "../server.config";
 
export class AnonymousOnlyMdw implements ExpressMiddlewareInterface {
 
    use(request: any, response: any, next?: (err?: any) => any): any {
        
        response.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        const session: SessionModel = request.session;
        if (session && session.connectSid) {
            if(session.user.mustChgPwd) {
                return response.redirect(config.basePrefix + "/changepwd.htm");
            } else {
                return response.redirect(config.basePrefix + "/desktop.htm");
            }
        }         
        next();                
    }

}