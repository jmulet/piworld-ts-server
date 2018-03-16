import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { AvatarPickerComponent } from './avatarpicker.component';
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
    AvatarPickerComponent
  ],
  exports: [ 
    AvatarPickerComponent
  ]
})
export class AvatarPickerModule {}
