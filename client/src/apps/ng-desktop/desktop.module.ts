import { enableProdMode, NgModule } from '@angular/core';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DesktopComponent } from './desktop.component'; 
import { MyHttpInterceptor } from '../../interceptors/MyHttpInterceptor';
import { GrowlModule } from 'primeng/components/growl/growl';  
import { SocketService } from '../shared/services/socket.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { TableModule } from 'primeng/components/table/table';  
import { UsersOnlineModule } from '../shared/modules/usersonline/usersonline.module';
import { UsersOnlineComponent } from '../shared/modules/usersonline/usersOnline.component';
import { UsersActionsModule } from '../shared/modules/useractions/usersactions.module';
import { UserActionsComponent } from '../shared/modules/useractions/userActions.component';
import { RestApi } from '../../rest/RestApi';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule, 
   // BrowserAnimationsModule,
    GrowlModule,
    TableModule,
//UsersOnlineModule,
    UsersActionsModule
  ],
  declarations: [
    DesktopComponent
  ],
  providers: [
    RestApi,
    SocketService, 
    MessageService,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: MyHttpInterceptor, 
      multi: true 
    }
  ],
  bootstrap: [
    DesktopComponent,
   // UsersOnlineComponent,
    UserActionsComponent
  ]
})
export class DesktopModule {}
