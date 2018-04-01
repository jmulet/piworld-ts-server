import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';

import { UsersOnlineComponent } from './usersOnline.component';
import { SocketService } from '../../services/socket.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule
  ],
  declarations: [
    UsersOnlineComponent
  ],
  providers: [
    SocketService
  ],
  exports: [ 
    UsersOnlineComponent 
  ]
})
export class UsersOnlineModule {}
