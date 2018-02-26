const $ = require('jquery');
import jqslim from 'jquery-slimscroll';
import 'bootstrap';
import 'admin-lte/dist/js/adminlte';
import EJSON from 'ejson'; 
import SocketJS from 'socket.io-client';
import angular from 'angular';
import 'angular-sanitize';

// Common angularjs modules
import './libs/angular/growl/angular-growl';
import './libs/ng-modules/modals/Modals';
import './libs/ng-modules/Auth';
import './libs/ng-modules/PwTable';
import './libs/ng-modules/Translate';
import 'angular-ui-bootstrap';
window.jQuery = $;
window.$ = $;
window.EJSON = EJSON;
window.SocketJS = SocketJS;
window.angular = angular;