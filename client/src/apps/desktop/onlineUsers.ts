import { $socket } from "../shared/services/SocketService";
import * as $ from "jquery";

interface UserSocket {
    fullname: string;
    icon: string;
    id: number;
    login: string | Date;
    totalConnected: number;
    username: string;
}

let chatsRecieved = [];
let online = [];
let count = { totalConnected: 0 };

function displayUsers() {
    const $container = $("#online-menu");
    const $number = $("#online-number");
    $container.find(".online").remove();
    $number.val(count.totalConnected);

    online.forEach(e => { 
        const el = `
        <a class="dropdown-item online" href="#">
    <span class="pull-left">
        <img src="${e.icon}" class="img-circle" alt="User Image">
    </span>
     <span>${e.username}</span>
     <small>
            <i class="fa fa-clock-o"></i>${e.login}
    </small>                
    </a>
    `
        $container.append(el);
    })
}

export function onlineUsers() {
    $socket.connect();

    $socket.on("usersOnline", (list) => {
        console.log(list);
        online = list;
        count.totalConnected = list.length;
        displayUsers();
    });

    $socket.on("usersLogedin", (user) => {
        console.log("usersLogedin", user);
        const found = online.filter(function (e) { return e.id === user.id });
        if (found.length === 0) {
            online.push(user);
            //if (user.id !== pwApp.user.id)
            {
                //this.growl.add({ severity: 'info', summary: 'Login', detail: 'user.fullname + " ha iniciat sessió' });
            }
            console.log(user.fullname + " ha iniciat sessió");
        }
        count.totalConnected = user.totalConnected;
        displayUsers();
    });

    $socket.on("usersLogedout", (user) => {
        const found = online.filter(function (e) { return e.id === user.id });
        if (found.length) {
            const index = online.indexOf(found[0]);
            online.splice(index, 1);
        }
        //this.growl.add({ severity: 'warning', summary: 'Logout', detail: 'user.fullname + " ha sortir de la sessió' });
        console.log(user.fullname + " ha sortit de la sessió");
        count.totalConnected = user.totalConnected;
        displayUsers();
    });

    $socket.on("chatsNew", function (chat) {
        chatsRecieved.push(chat);
    });
}