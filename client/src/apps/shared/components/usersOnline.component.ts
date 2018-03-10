
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { SocketService } from '../services/socket.service';
@Component({
    selector: 'users-online',
    template: require('./usersOnline.component.html'),
    styleUrls: []
})
export class UsersOnlineComponent implements OnInit {
    chatsRecieved: any[];
    onlineUsers: any[];
    count = {totalConnected: 0};
    
    constructor(private socket: SocketService, private growl: MessageService) {
        this.onlineUsers = [];
        this.chatsRecieved = [];
    }
    ngOnInit() {
        this.socket.on("usersOnline", (list)=> {
            console.log(list);
            this.onlineUsers = list;
            this.count.totalConnected = list.length;
        });

        this.socket.on("usersLogedin", (user) => {
            console.log("usersLogedin", user);
           const found = this.onlineUsers.filter( function(e) { return e.id === user.id} );
           if (found.length === 0) {
               this.onlineUsers.push(user);
               //if (user.id !== pwApp.user.id)
               {
                    this.growl.add({ severity: 'info', summary: 'Login', detail: 'user.fullname + " ha iniciat sessió' });
               }
           }
           this.count.totalConnected = user.totalConnected;
       });
       
       this.socket.on("usersLogedout", (user) => 
       {
           const found = this.onlineUsers.filter( function(e) { return e.id === user.id} );
           if (found.length) {
               const index = this.onlineUsers.indexOf(found[0]);
               this.onlineUsers.splice(index, 1);
           } 
           this.growl.add({ severity: 'warning', summary: 'Logout', detail: 'user.fullname + " ha sortir de la sessió' });
           this.count.totalConnected = user.totalConnected;
       });
   
       this.socket.on("chatsNew", function(chat){
           this.chatsRecieved.push(chat);
       });
   
    }
}