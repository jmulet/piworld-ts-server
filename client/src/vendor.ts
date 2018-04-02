// Other vendors for example jQuery, Lodash or Bootstrap
// You can import js, ts, css, sass, ...
//const jQuery = require('jquery');
//window["jQuery"] = jQuery;
//window["$"] = jQuery;
import "jquery";

// import jqslim from 'jquery-slimscroll';
import 'popper.js';
import 'bootstrap';

//import 'admin-lte/dist/js/adminlte';

window["EJSON"] = require('ejson');
window["socketio_ejson_parser"] = require('./assets/js/socketio-ejson-parser');
window["SocketJS"] = require('socket.io-client');
// window["CryptoJS"] = require('crypto-js');
import "socket.io-client";

// Do not import the whole crypto-js
//import "crypto-js";
//import 'crypto-js/aes';

// Angular
import '@angular/core';
import '@angular/common';
import '@angular/common/http'; 
import '@angular/forms';
import '@angular/router';
 
// RxJS
//Do not import the entire rxjs; only used operators
//import 'rxjs';
//export {Observable} from 'rxjs/Observable';
//export {map} from 'rxjs/operators/map';

