
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { SocketService } from '../services/socket.service'; 
import { pwCore, pwCoreI } from '../../admin/pw-core';
import { RestApi } from '../../../rest/RestApi';

@Component({
    selector: 'user-actions',
    template: require('./userActions.component.html'),
    styleUrls: []
})
export class UserActionsComponent implements OnInit {    
    avatar: string; 
    constructor(private rest: RestApi, private growl: MessageService) {        
    }
    ngOnInit() {
        
        this.avatar = pwCore.Config.staticPrefix + "/assets/img/avatar/" 
                        + (pwCore.User.uopts.avatar || 0) +".png";
    }
    logout() {        
        this.rest.ApiUsers.logout().subscribe( (data: any)=> {
            window.location.href = data.url; 
        });
    }
}