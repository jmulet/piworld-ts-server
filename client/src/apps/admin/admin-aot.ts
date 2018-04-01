require("../../polyfills");
require("../../vendor");

import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { AdminModule } from './admin.module';

const factory = require('./admin.module.ngfactory')

enableProdMode();
platformBrowser().bootstrapModuleFactory(factory.AdminModuleNgFactory);