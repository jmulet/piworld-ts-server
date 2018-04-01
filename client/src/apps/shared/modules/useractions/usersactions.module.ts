import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

import { UserActionsComponent } from './userActions.component'; 
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [
    UserActionsComponent
  ],
  providers: [ 
  ],
  exports: [ 
    UserActionsComponent 
  ]
})
export class UsersActionsModule {}
