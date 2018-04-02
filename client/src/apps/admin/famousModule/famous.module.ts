import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PickListModule } from 'primeng/picklist';

import { CourseLevelPickerComponent } from '../../shared/components/courseLevelPicker.component';
import { CourseStudiesPickerComponent } from '../../shared/components/courseStudiesPicker.component';
import { SubjectPickerComponent } from '../../shared/components/subjectpicker.component';
import { VisibilityPickerComponent } from '../../shared/components/visibilityPicker.component';
import { AdminSharedModule } from '../admin-shared.module';
import { FamousComponent } from './famous.component';
  
const routes: Routes = [
  { path: '', component: FamousComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    AdminSharedModule,   
    PickListModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ 
    FamousComponent,
    SubjectPickerComponent,
    CourseLevelPickerComponent,
    CourseStudiesPickerComponent, 
    VisibilityPickerComponent
  ], 
  providers: [ 
 
  ],
  exports: [
    RouterModule
  ]
})
export class NewsModule {}
