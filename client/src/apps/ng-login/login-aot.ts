require("../../polyfills");
require("../../vendor");

import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { LoginModule } from './login.module'; 

const factory = require('./login.module.ngfactory');
enableProdMode();
platformBrowser().bootstrapModuleFactory(factory.LoginModuleNgFactory);