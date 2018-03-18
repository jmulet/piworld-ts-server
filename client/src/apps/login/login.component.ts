import { Component } from '@angular/core';

import { RestService, LoginBodyModel } from '../shared/services/rest.service';
import { pwCore } from '../admin/pw-core';


@Component({
    selector: 'app-component',
    template: require('./login.component.html'),
    styleUrls: []
})
export class LoginComponent {
    alert: any;
    msg: any;
    opts: { processing: boolean; showAlert: boolean; };
    model: LoginBodyModel;
    users: any[];
    constructor(private rest: RestService) {
        this.model = {
            username: "", password: "",
            rememberme: false,
            app: getParameterByName("app"),
            path: getParameterByName("path")
        };
        this.opts = { processing: false, showAlert: false };
    }

    rootLogin() {
        this.model.username = "root";
        this.model.password = "root";
        this.doLogin();
    }

    doLogin () {
        this.opts.processing = true;
        this.opts.showAlert = false;
        const __ = pwCore.__;
  
        this.rest.login(this.model).subscribe((data: any)=> { 
            this.opts.processing = false;
            if (data.errCode) {
                // Invalid login
                this.opts.showAlert = true;
                this.alert = __(data.errCode);
            } else if (data.redirect) {
                window.location.href = data.redirect;
            }
        }); 
    };
}


 function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
