require("../../polyfills");
require("../../vendor");

import { enableProdMode } from '@angular/core';
import { platformBrowser} from '@angular/platform-browser';
import { FilemanagerModule } from './filemanager.module';

const factory = require('./filemanager.module.ngfactory');

enableProdMode();
platformBrowser().bootstrapModuleFactory(factory.FileManagerModuleNgFactory);