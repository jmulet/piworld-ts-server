import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';

import { LevelPickerComponent } from './levelpicker.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    DropdownModule
  ],
  declarations: [
    LevelPickerComponent
  ],
  exports: [ 
    LevelPickerComponent
  ]
})
export class LevelPickerModule {}
