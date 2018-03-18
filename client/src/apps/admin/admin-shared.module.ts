import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { GrowlModule } from 'primeng/growl';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';

import { AvatarPickerModule } from '../shared/modules/avatarpicker/avatarpicker.module';
import { RolePickerModule } from '../shared/modules/rolepicker/rolepicker.module';
import { StatusPickerModule } from '../shared/modules/statuspicker/statuspicker.module';
import { RolesPipe } from '../shared/pipes/roles.pipe';
import { RestService } from '../shared/services/rest.service';
import { SocketService } from '../shared/services/socket.service';
import { TranslateService } from '../shared/services/translate.service';
import { AdminRestService } from './services/adminrest.service';
import { CommonModule } from '@angular/common';

 

@NgModule({
  imports: [
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
  ],
  declarations: [
    RolesPipe
  ],
  providers: [  
    TranslateService,
    MessageService,
    SocketService,
    RestService,
    AdminRestService,
    MessageService,
    ConfirmationService,
    FormBuilder
  ],
  exports: [
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
    RolesPipe
  ]
})
export class AdminSharedModule {}