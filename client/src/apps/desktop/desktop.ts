import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DesktopModule } from './desktop.module';
 
enableProdMode();
platformBrowserDynamic().bootstrapModule(DesktopModule /*, options*/);