import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { RolePickerComponent } from './rolepicker.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
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
