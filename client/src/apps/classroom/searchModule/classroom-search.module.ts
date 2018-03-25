import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClassroomSharedModule } from '../classroom-shared.module';
import { ClassroomSearchComponent } from './classroom-search.component';

const routes: Routes = [
    { path: '', component: ClassroomSearchComponent},
    { path: '**', redirectTo: '', pathMatch: 'full' }
  ];

@NgModule({
  imports: [
    CommonModule,
    ClassroomSharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [  
      ClassroomSearchComponent, 
  ],
  providers: [ 
  ], 
  exports: [
      RouterModule
  ]
})
export class ClassroomSearchModule {}