import { enableProdMode, NgModule } from '@angular/core';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DesktopComponent } from './desktop.component'; 
import { MyHttpInterceptor } from '../../interceptors/MyHttpInterceptor';
import { GrowlModule } from 'primeng/components/growl/growl'; 
import { UsersOnlineComponent } from '../shared/components/usersOnline.component';
import { SocketService } from '../shared/services/socket.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { TableModule } from 'primeng/components/table/table'; 
import { UserActionsComponent } from '../shared/components/userActions.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule, 
   // BrowserAnimationsModule,
    GrowlModule,
    TableModule
  ],
  declarations: [
    DesktopComponent,
    UsersOnlineComponent,
    UserActionsComponent
  ],
  providers: [
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
    UsersOnlineComponent,
    UserActionsComponent
  ]
})
export class DesktopModule {}
