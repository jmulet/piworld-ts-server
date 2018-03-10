import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AdminModule } from './admin.module';
 
enableProdMode();
platformBrowserDynamic().bootstrapModule(AdminModule /*, options*/);