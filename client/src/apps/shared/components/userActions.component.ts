
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { SocketService } from '../services/socket.service';
import { RestService } from '../services/rest.service';
import { pwCore, pwCoreI } from '../../admin/pw-core';

@Component({
    selector: 'user-actions',
    template: require('./userActions.component.html'),
    styleUrls: []
})
export class UserActionsComponent implements OnInit {    
    avatar: string; 
    constructor(private rest: RestService, private growl: MessageService) {        
    }
    ngOnInit() {
        
        this.avatar = pwCore.Config.staticPrefix + "/assets/img/avatar/" 
                        + (pwCore.User.uopts.avatar || 0) +".png";
    }
    logout() {        
        this.rest.logout().subscribe( (data: any)=> {
            window.location.href = data.url; 
        });
    }
}