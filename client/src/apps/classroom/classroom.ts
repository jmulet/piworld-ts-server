import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ClassroomModule } from './classroom.module';
 
enableProdMode();
platformBrowserDynamic().bootstrapModule(ClassroomModule /*, options*/);