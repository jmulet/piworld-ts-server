import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Config } from '../apps/Config';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';

function getCookie(name) {
    const splitCookie = document.cookie.split(';');
    for (let i = 0; i < splitCookie.length; i++) {
     const val = splitCookie[i];
     const splitValue = val.split('=');
      if (splitValue[0] === name) {
        return splitValue[1];
      }
    }
    return '';
}

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const responseType = req.responseType;  // Store the original responseType
        // Always return response as text since it will be parsed manually
        req = req.clone({responseType: 'text'})        
        if (req.body && typeof req.body === 'object') {
            req = req.clone({ body: window["EJSON"].stringify(req.body)});
        }
        // Modify the url with the base prefix; and applying encrypted body if necessary
        if (req.url.indexOf("@")===0) {
            req = req.clone({ url: Config.basePrefix + req.url.substring(1)});
        }
        else if (req.url.indexOf("*")===0) {
            const cookie = getCookie(Config.basePrefix + "pwsid");
            req = req.clone({ url: '/demo' + req.url.substring(1), setHeaders: {"Content-Type": "text/plain;charset=UTF-8"},
                body: window["CryptoJS"].AES.encrypt(req.body, cookie).toString()});
        }
      
        //send the newly created request
        return next.handle(req).map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                let res: HttpResponse<any> = event;
                console.log('the response: ', res);
                // change the response body here
                if (res.body && typeof res.body === 'string' && responseType === 'json') {                
                    res = res.clone({ body: window["EJSON"].parse(res.body) });
                    
                }
                return res;
            }
            return event;
        }).catch((errorRes, caught) => {
                //intercept the respons error and displace it to the console
                if (errorRes.error && typeof errorRes.error === 'string') {
                    errorRes.error = window["EJSON"].parse(errorRes.error);
                }
                //return the error to the method that called it                
                return Observable.throw(errorRes.error || errorRes);
            }) as any;
    }

    transformBody(body) {
        return JSON.stringify({tranformed: true});
    }
}