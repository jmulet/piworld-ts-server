import { NgModule } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { MessageService } from 'primeng/components/common/messageservice';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { GrowlModule } from 'primeng/growl';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/components/table/table';
import { TabViewModule } from 'primeng/tabview';

import { AvatarPickerModule } from '../shared/modules/avatarpicker/avatarpicker.module';
import { RolePickerModule } from '../shared/modules/rolepicker/rolepicker.module';
import { StatusPickerModule } from '../shared/modules/statuspicker/statuspicker.module';
import { RolesPipe } from '../shared/pipes/roles.pipe';
import { RestApi } from '../../rest/RestApi';
import { SocketService } from '../shared/services/socket.service';
import { TranslateService } from '../shared/services/translate.service'; 
import { CommonModule } from '@angular/common';

import {DragDropModule} from 'primeng/dragdrop';
import { UnitVisibilityPipe } from '../shared/pipes/unit-visibility.pipe';
import { KatexDirective } from '../shared/directives/katex.directive';

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
    DragDropModule
  ],
  declarations: [
    RolesPipe,
    UnitVisibilityPipe,
    KatexDirective    
  ],
  providers: [  
    TranslateService,
    MessageService, 
    RestApi, 
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
    RolesPipe,
    UnitVisibilityPipe,
    KatexDirective
  ]
})
export class AdminSharedModule {}