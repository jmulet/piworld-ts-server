import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/components/common/messageservice';
import { Observable } from 'rxjs/Rx'; 
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/catch';
import * as CryptoJS from 'crypto-js';
 
function getCookie(name) {
    console.log(name);
    const splitCookie = document.cookie.split(';');
    for (let i = 0; i < splitCookie.length; i++) {
     const val = splitCookie[i];
     const splitValue = val.split('=');
      if (splitValue[0].trim() === name) {
        return splitValue[1].trim();
      }
    }
    return '';
}

const Config = window["pwCore"]["Config"];

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    constructor(private growl: MessageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const responseType = req.responseType;  // Store the original responseType
        // Always return response as text since it will be parsed manually
        req = req.clone({responseType: 'text'})        
        if (req.body && typeof req.body === 'object') {
            req = req.clone({ body: EJSON.stringify(req.body)});
        }
        // Modify the url with the base prefix; and applying encrypted body if necessary
        if (req.url.indexOf("@")===0) {
            console.log(req.url);
            req = req.clone({ url: Config.basePrefix + req.url.substring(1)});
            console.log(req.url);
        }
        else if (req.url.indexOf("*")===0) {
            const cookie = getCookie(Config.basePrefix + "pwsid");
            console.log("cookie", cookie);
            req = req.clone({ url: '/demo' + req.url.substring(1), setHeaders: {"Content-Type": "text/plain;charset=UTF-8"},
                body: CryptoJS.AES.encrypt(req.body, cookie).toString()});
        }
      
        //send the newly created request
        return next.handle(req).map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                let res: HttpResponse<any> = event;
                // change the response body here
                if (res.body && typeof res.body === 'string' && responseType === 'json') {                
                    res = res.clone({ body: EJSON.parse(res.body) });
                }
                return res;
            }
            return event;
        }).catch((errorRes: any, caught: any) => {
            if (errorRes instanceof HttpErrorResponse) {
                if (errorRes.status >= 500) {
                    // Server error
                    this.growl.add({ severity: 'error', summary: 'Internal server error', detail: errorRes.message });
                }
            }
            //intercept the responds error and displace it to the console
            if (errorRes.error && typeof errorRes.error === 'string') {
                // Form errors (invalid request)                
                errorRes["error"] = EJSON.parse(errorRes.error);
                if (errorRes.status === 401) {
                    // Invalid request
                    this.growl.add({ severity: 'warning', summary: 'Form errors', detail: 'Reviseu els errors del formulari' });
                }
            }
                //return the error to the method that called it                
                return Observable.throw(errorRes.error || errorRes);
            }) as any;
    }
 
}