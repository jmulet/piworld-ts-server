import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';

import { RolePickerComponent } from './rolepicker.component';

@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    DropdownModule
  ],
  declarations: [
    RolePickerComponent
  ],
  exports: [
      RolePickerComponent
  ]
})
export class RolePickerModule {}
