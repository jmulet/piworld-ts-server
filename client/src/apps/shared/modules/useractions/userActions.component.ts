import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { RestApi } from '../../../../rest/RestApi';
import { pwCore } from '../../pw-core';
import { HttpClient } from '@angular/common/http';
 

@Component({
    selector: 'user-actions',
    templateUrl: './userActions.component.html',
    styleUrls: []
})
export class UserActionsComponent implements OnInit {    
    avatar: string; 
    constructor(private http: HttpClient) {        
    }
    ngOnInit() {
        
        this.avatar = pwCore.Config.staticPrefix + "/assets/img/avatar/" 
                        + (pwCore.User.uopts.avatar || 0) +".png";
    }
    logout() {        
        this.http.get(pwCore.Config.basePrefix + "/api/user/logout", {}).subscribe( (data: any)=> {
            window.location.href = data.url; 
        });
    }
}