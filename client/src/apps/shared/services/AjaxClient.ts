
import * as $ from 'jquery';
import { pwCore } from '../pw-core';
import * as EJSON from 'ejson';
import { AES } from 'crypto-js';


export function getCookie(name) { 
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

export function prefixUrl(url: string) {
    url = (url || "").trim();
    return (pwCore.Config.basePrefix + "/" + url).replace("//", "/");   
}

const cookieName =  pwCore.Config.basePrefix + "pwsid";
const secret = getCookie(cookieName)

class AjaxClient {
    constructor() {
    }

    private ajax(method: string, url: string, data: any, urlParameters?: any) {
        let type = "application/json";
        let data2;
        if (data) {
            data2 = EJSON.stringify(data);
        } 
        let url2 = (url || '').trim();
        if (url2.startsWith("@") ) {
            url2 = prefixUrl(url.substring(1));            
        } else if (url2.startsWith("*") ) {
            url2 = prefixUrl(url.substring(1));
            type = "text/plain;charset=UTF-8";
            if (data2) {
                data2 = AES.encrypt(data2, secret).toString();
            }
        }

        if (urlParameters) {
            var encoded = $.param(urlParameters);
            if (encoded) {
                url2 += "?" + encoded; 
            }
        }
        
        return $.ajax(url2, {
             method: method,
             data: data2,
             contentType: type
         });
    }

    post(url: string, data: any, urlParameters?: any) {
        return this.ajax("post", url, data, urlParameters);
    }

    put(url: string, data: any, urlParameters?: any) {
        return this.ajax("put", url, data, urlParameters);
    }

    get(url: string, urlParameters?: any) {
        return this.ajax("get", url, null, urlParameters);
    }

    delete(url: string, urlParameters?: any) {
        return this.ajax("delete", url, null, urlParameters);
    }
}

export const $http = new AjaxClient();