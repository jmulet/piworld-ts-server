import * as express from "express";

// Cookie parser
export function cookieParser(request: express.Request, name?: string) {

    let list: any = {};
    const rc = request.headers ? request.headers.cookie : request;

    if (rc) {
        
            rc.toString().split(';').forEach((cookie: string) => {
                const parts = cookie.split('=');
                let key = parts.shift().trim();
                let value = decodeURI(parts.join('='));
                value = value.replace(/['']/g, '');
                list[key] = value;
            });
       
    }

    if (name) {
        return list[name];
    }
    
    return list;

}

