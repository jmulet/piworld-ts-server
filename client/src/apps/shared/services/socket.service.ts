import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
//import * as socketio_ejson_parser from '../../../libs/socketio-ejson-parser';

@Injectable()
export class SocketService {

    private socket: any;

    constructor() {
        const Config = window["pwCore"]["Config"];
        console.log("Init socket", window["SocketJS"]);
        this.socket = window["SocketJS"].connect({ path: Config.socketPath, forceNew: true, parser: window["socketio_ejson_parser"] });
        console.log("socket init ", this.socket);
        // Strange bug. If not emiting, then no response is recieved on connect
        this.socket.emit("socketStart");
    }

  
    on(eventName: string, callback: Function): void {
        var s = this.socket;
        s.on(eventName, function() {
            var args = arguments;
            console.log("socket on:: ", eventName, args);
            callback.apply(s, args);
        });
    }

    emit(eventName: string, data: any, callback: Function): void {
        var s = this.socket;
        s.emit(eventName, data, function() {
            console.log("socket emit:: ", eventName, data);
            var args = arguments;

            if (callback) {
                callback.apply(s, args);
            }
        })
    }

}