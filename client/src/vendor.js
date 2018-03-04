const $ = require('jquery');
import jqslim from 'jquery-slimscroll';
import 'bootstrap';
import 'admin-lte/dist/js/adminlte';
import EJSON from 'ejson'; 
import SocketJS from 'socket.io-client';
import angular from 'angular';
import 'angular-sanitize';
import 'angular-ui-bootstrap';
import CryptoJS from 'crypto-js'; 
window.jQuery = $;
window.$ = $;
window.EJSON = EJSON;
window.SocketJS = SocketJS;
window.angular = angular;
window.CryptoJS = CryptoJS;

// Shared Angular modules that do not depend on pwCore
import './libs/angular/growl/angular-growl';