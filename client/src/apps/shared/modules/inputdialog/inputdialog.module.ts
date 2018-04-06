import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
 
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/components/dialog/dialog';
import { InputDialogComponent } from './inputdialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DialogModule
  ],
  declarations: [
    InputDialogComponent
  ],
  exports: [ 
    InputDialogComponent
  ]
})
export class InputDialogModule {}
