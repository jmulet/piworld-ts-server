
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { SocketService } from '../services/socket.service';
import { RestService } from '../services/rest.service';

@Component({
    selector: 'user-actions',
    template: require('./userActions.component.html'),
    styleUrls: []
})
export class UserActionsComponent implements OnInit {    
    avatar: string;
    Config: any;
    constructor(private rest: RestService, private growl: MessageService) {        
    }
    ngOnInit() {
        this.Config = window["pwCore"]["Config"];
        this.avatar = this.Config.basePrefix + "/assets/img/avatar/" 
                        + (this.Config.user.uopts.avatar || 0) +".png";
    }
    logout() {        
        this.rest.logout().subscribe( (data: any)=> {
            window.location.href = data.url; 
        });
    }
}