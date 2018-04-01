require("../../polyfills");
require("../../vendor");

import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { DesktopModule } from './desktop.module';
 
const factory = require('./desktop.module.ngfactory');

enableProdMode();
platformBrowser().bootstrapModuleFactory(factory.DesktopModuleNgFactory);