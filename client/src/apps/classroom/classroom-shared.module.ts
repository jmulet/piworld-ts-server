import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { GrowlModule } from 'primeng/components/growl/growl';
import { PanelModule } from 'primeng/components/panel/panel';
import { TableModule } from 'primeng/components/table/table';

import { RestApi } from '../../rest/RestApi';
import { SocketService } from '../shared/services/socket.service';


@NgModule({
  imports: [ 
    FormsModule, 
    GrowlModule,
    TableModule,
    DropdownModule,
    PanelModule
  ],
  declarations: [     
  ],
  providers: [
    RestApi,
    SocketService,  
    MessageService
  ],
  exports: [ 
    FormsModule, 
    GrowlModule,
    TableModule,
    DropdownModule,
    PanelModule
  ]
})
export class ClassroomSharedModule {}
