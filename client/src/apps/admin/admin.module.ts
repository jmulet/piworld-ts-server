import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MessageService } from 'primeng/components/common/messageservice';
import { GrowlModule } from 'primeng/components/growl/growl';
import { TableModule } from 'primeng/components/table/table';

import { MyHttpInterceptor } from '../../interceptors/MyHttpInterceptor';
import { UsersOnlineComponent } from '../shared/components/usersOnline.component';
import { RestService } from '../shared/services/rest.service';
import { SocketService } from '../shared/services/socket.service';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { OtherComponent } from './components/other.component';
import { CentersComponent } from './components/centers.component';
import { RolePickerModule } from '../shared/modules/rolepicker/rolepicker.module';
import { StatusPickerModule } from '../shared/modules/statuspicker/statuspicker.module';
import { AdminRestService } from './services/adminrest.service';

const appRoutes: Routes = [
  { path: 'centers', component: CentersComponent },
  { path: 'other', component: OtherComponent },
  { path: '',  component: CentersComponent },
  { path: '**', component: CentersComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule, 
   // BrowserAnimationsModule,
    GrowlModule,
    TableModule,
    RolePickerModule,
    StatusPickerModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  declarations: [
    AdminComponent,
    UsersOnlineComponent,
    OtherComponent,
    CentersComponent
  ],
  providers: [
    SocketService,
    RestService,
    AdminRestService,
    MessageService,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: MyHttpInterceptor, 
      multi: true 
    }
  ],
  bootstrap: [
    AdminComponent,
    UsersOnlineComponent
  ]
})
export class AdminModule {}
