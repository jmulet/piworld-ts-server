import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './desktop.module';
 
enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule /*, options*/);