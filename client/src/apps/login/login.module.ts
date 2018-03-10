import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MessageService } from 'primeng/components/common/messageservice';

import { MyHttpInterceptor } from '../../interceptors/MyHttpInterceptor';
import { LoginComponent } from './login.component';
import { TranslateDirective } from '../shared/directives/translate.directive';
import { RestService } from '../shared/services/rest.service';
import { TranslatePipe } from '../shared/pipes/translate.pipe';

//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule 
  ],
  declarations: [
    LoginComponent,
    TranslateDirective,
    TranslatePipe
  ],
  providers: [
     RestService,
     MessageService,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: MyHttpInterceptor, 
      multi: true 
    }
  ],
  bootstrap: [
    LoginComponent 
  ]
})
export class LoginModule {}
