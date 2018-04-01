require("../../polyfills");
require("../../vendor");

import { enableProdMode } from '@angular/core';
import { platformBrowser} from '@angular/platform-browser';
import { ClassroomModule } from './classroom.module';

const factory = require('./classroom.module.ngfactory');

enableProdMode();
platformBrowser().bootstrapModuleFactory(factory.ClassroomModuleNgFactory);