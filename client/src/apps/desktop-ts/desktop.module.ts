import { enableProdMode, NgModule } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SecondComponent } from './second.component';
import { MyHttpInterceptor } from '../../interceptors/MyHttpInterceptor';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    SecondComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: MyHttpInterceptor, 
      multi: true 
    }
  ],
  bootstrap: [
    AppComponent,
    SecondComponent
  ]
})
export class AppModule {}
