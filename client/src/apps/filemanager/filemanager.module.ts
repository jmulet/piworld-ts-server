import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/components/common/messageservice';

import { MyHttpInterceptor } from '../../interceptors/MyHttpInterceptor';
import { RestApi } from '../../rest/RestApi';
import { FilemanagerComponent } from './filemanager.component';

import { TreeTableModule } from 'primeng/components/treetable/treetable';
import { FileUploadModule } from 'primeng/components/fileupload/fileupload';
import { GrowlModule } from 'primeng/components/growl/growl';
import {ToolbarModule} from 'primeng/components/toolbar/toolbar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { InputDialogModule } from '../shared/modules/inputdialog/inputdialog.module';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TreeTableModule,
    FileUploadModule,
    GrowlModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputDialogModule
  ],
  declarations: [
    FilemanagerComponent
  ],
  providers: [
    RestApi, 
    MessageService,
    ConfirmationService,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: MyHttpInterceptor, 
      multi: true 
    }
  ],
  bootstrap: [
    FilemanagerComponent 
  ]
})
export class FilemanagerModule {}
