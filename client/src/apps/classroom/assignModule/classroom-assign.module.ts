import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClassroomSharedModule } from '../classroom-shared.module';
import { ClassroomAssignComponent } from './classroom-assign.component';

const routes: Routes = [
    { path: '', component: ClassroomAssignComponent},
    { path: '**', redirectTo: '', pathMatch: 'full' }
  ];

@NgModule({
  imports: [
    CommonModule,
    ClassroomSharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [  
    ClassroomAssignComponent, 
  ],
  providers: [ 
  ], 
  exports: [
      RouterModule
  ]
})
export class ClassroomAssignModule {}