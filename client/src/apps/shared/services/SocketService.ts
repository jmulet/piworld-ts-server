import { pwCore } from '../pw-core';
import * as SocketJS from 'socket.io-client'
import * as socketioParser from './socketio-ejson-parser';
const Config = pwCore.Config;

class SocketService {

    private socket: any;

    constructor() {               
    }

    connect() {
        const opts = {path: "/" + Config.socketPath, forceNew: true, parser: socketioParser };
        console.log("Init socket", opts);
        this.socket = SocketJS.connect(opts);
        console.log("socket init ", this.socket);
        // Strange bug. If not emiting, then no response is recieved on connect
        this.socket.emit("socketStart");
    }

    on(eventName: string, callback: Function): void {
        var s = this.socket;
        s.on(eventName, function () {
            var args = arguments;
            console.log("socket on:: ", eventName, args);
            callback.apply(s, args);
        });
    }

    emit(eventName: string, data: any, callback: Function): void {
        var s = this.socket;
        s.emit(eventName, data, function () {
            console.log("socket emit:: ", eventName, data);
            var args = arguments;

            if (callback) {
                callback.apply(s, args);
            }
        })
    }

}

export const $socket = new SocketService();