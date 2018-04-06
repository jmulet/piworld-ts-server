require("../../polyfills");
require("../../vendor");

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FilemanagerModule } from './filemanager.module';
 
enableProdMode();
platformBrowserDynamic().bootstrapModule(FilemanagerModule /*, options*/);