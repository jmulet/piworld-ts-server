import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClassroomSharedModule } from '../classroom-shared.module';
import { ClassroomActivityComponent } from './classroom-activity.component';

const routes: Routes = [
    { path: '', component: ClassroomActivityComponent},
    { path: '**', redirectTo: '', pathMatch: 'full' }
  ];

@NgModule({
  imports: [
    CommonModule,
    ClassroomSharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [  
    ClassroomActivityComponent, 
  ],
  providers: [ 
  ],
  exports: [
      RouterModule
  ]
})
export class ClassroomActivityModule {}