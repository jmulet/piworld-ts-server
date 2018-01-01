import * as express from "express";

export function DebugMdw(request: express.Request, response: express.Response, next: express.NextFunction) {
    const _send = response.send;
    let sent = false;
    response.send = function(data) {
        if (sent) {
            console.log("Upps! DebugMdw:: ",request.path);
            return "{}";
        }
        sent = true;
        return _send.bind(response)(data);        
    };
    next();
}