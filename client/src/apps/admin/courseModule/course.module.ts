
import { NgModule } from '@angular/core';
 

 import { RolePickerModule } from '../../shared/modules/rolepicker/rolepicker.module';
 import { CourseComponent } from './course.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminSharedModule } from '../admin-shared.module';
import { CourseStudiesPickerComponent } from '../../shared/components/courseStudiesPicker.component';
import { CourseLevelPickerComponent } from '../../shared/components/courseLevelPicker.component';
import { SubjectPickerComponent } from '../../shared/components/subjectpicker.component';
import { CourseEditComponent } from './dialogs/courseedit.component';
import { GroupEditComponent } from './dialogs/groupedit.component';
import { UnitEditComponent } from './dialogs/unitedit.component';
import { VisibilityPickerComponent } from '../../shared/components/visibilityPicker.component';

const routes: Routes = [
  { path: '', component: CourseComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    AdminSharedModule,   
    RouterModule.forChild(routes)
  ],
  declarations: [ 
    CourseComponent,
    SubjectPickerComponent,
    CourseLevelPickerComponent,
    CourseStudiesPickerComponent,
    CourseEditComponent,
    GroupEditComponent,
    UnitEditComponent,
    VisibilityPickerComponent
  ], 
  providers: [ 
 
  ],
  exports: [
    RouterModule
  ]
})
export class CourseModule {}
