import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MessageService } from 'primeng/components/common/messageservice';
import { GrowlModule } from 'primeng/growl';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import {TabViewModule} from 'primeng/tabview';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';

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
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import { AvatarPickerModule } from '../shared/modules/avatarpicker/avatarpicker.module';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { UsersImportComponent } from './dialogs/usersimport.component';
import { CenterEditComponent } from './dialogs/centeredit.component';
import { UserEditComponent } from './dialogs/useredit.component';
import { RolesPipe } from '../shared/pipes/roles.pipe';
import { CenterOptsComponent } from './dialogs/centeropts.component';
import { TranslateService } from '../shared/services/translate.service';

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
    GrowlModule,
    TableModule,
    FormsModule,
    DropdownModule,
    ReactiveFormsModule,
    DialogModule,
    TabViewModule,
    MultiSelectModule,
    InputTextModule,
    ConfirmDialogModule,
    CalendarModule,

    RolePickerModule,
    StatusPickerModule,
    AvatarPickerModule,
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  declarations: [
    AdminComponent,
    UsersOnlineComponent,
    OtherComponent,
    CentersComponent,
    UsersImportComponent,
    CenterEditComponent,
    UserEditComponent,
    CenterOptsComponent,
    RolesPipe
  ],
  providers: [
    SocketService,
    RestService,
    AdminRestService,
    MessageService,
    ConfirmationService,
    FormBuilder,
    TranslateService,

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
