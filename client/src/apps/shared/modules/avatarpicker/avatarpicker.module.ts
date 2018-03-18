import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

import { AvatarPickerComponent } from './avatarpicker.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DropdownModule
  ],
  declarations: [
    AvatarPickerComponent
  ],
  exports: [ 
    AvatarPickerComponent
  ]
})
export class AvatarPickerModule {}
