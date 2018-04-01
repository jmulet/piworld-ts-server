require("../../polyfills");
require("../../vendor");

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { LoginModule } from './login.module';
 
enableProdMode();
platformBrowserDynamic().bootstrapModule(LoginModule /*, options*/);