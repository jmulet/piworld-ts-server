import { enableProdMode, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { MyHttpInterceptor } from '../../interceptors/MyHttpInterceptor';
import { GrowlModule } from 'primeng/components/growl/growl'; 
import { UsersOnlineComponent } from '../shared/components/usersOnline.component';
import { SocketService } from '../shared/services/socket.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { TableModule } from 'primeng/components/table/table'; 
import { UserActionsComponent } from '../shared/components/userActions.component';
import { ClassroomComponent } from './classroom.component'; 
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { PanelModule } from 'primeng/components/panel/panel';
import { UnitComponent } from './components/unit.component';
import { FormsModule } from '@angular/forms';
import { SectionHtmlComponent } from './components/sectionhtml.component';
import { SectionActivityComponent } from './components/section-activity.component';
import { RestApi } from '../../rest/RestApi';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule, 
    FormsModule,
    BrowserAnimationsModule,
    GrowlModule,
    TableModule,
    DropdownModule,
    PanelModule
  ],
  declarations: [
    ClassroomComponent,
    UsersOnlineComponent,
    UserActionsComponent,
    UnitComponent,
    SectionHtmlComponent,
    SectionActivityComponent
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
    ClassroomComponent,
    UsersOnlineComponent,
    UserActionsComponent
  ]
})
export class ClassroomModule {}
