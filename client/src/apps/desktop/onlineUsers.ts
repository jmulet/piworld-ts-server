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
    const $container = $("#onlineList");
    const $number = $("#onlineCount");
    const $allBtn = $("#onlineSeeAll")
    const $onlineTitle = $("#onlineTitle")
    $container.find(".online").remove();
    $number.text(count.totalConnected);

    online.forEach(e => { 
        const el = `
        <a href="#" class="dropdown-item online">
        <div class="media">
          <img src="${e.icon}" alt="User Avatar" class="img-size-50 mr-3 img-circle">
          <div class="media-body">
            <h3 class="dropdown-item-title">
                ${e.username}
              <span class="float-right text-sm text-danger">
                <i class="fa fa-star"></i>
              </span>
            </h3> 
            <p class="text-sm text-muted">
              <i class="fa fa-clock-o mr-1"></i> ${e.login}</p>
          </div>
        </div>
      </a>
      <div class="dropdown-divider online"></div>
    `
        $(el).insertAfter($onlineTitle);
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