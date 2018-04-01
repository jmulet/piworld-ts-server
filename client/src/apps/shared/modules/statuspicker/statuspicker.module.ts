import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';

import { StatusPickerComponent } from './statuspicker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule
  ],
  declarations: [
    StatusPickerComponent
  ],
  exports: [ 
    StatusPickerComponent
  ]
})
export class StatusPickerModule {}
