import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';

import { CoursePickerComponent } from './coursepicker.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    DropdownModule
  ],
  declarations: [
    CoursePickerComponent
  ],
  exports: [ 
    CoursePickerComponent
  ]
})
export class CoursePickerModule {}
