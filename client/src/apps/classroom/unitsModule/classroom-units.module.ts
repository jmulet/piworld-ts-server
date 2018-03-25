import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClassroomSharedModule } from '../classroom-shared.module';
import { ClassroomUnitsComponent } from './classroom-units.component';
import { SectionActivityComponent } from './components/section-activity.component';
import { SectionHtmlComponent } from './components/sectionhtml.component';
import { UnitComponent } from './components/unit.component';

const routes: Routes = [
    { path: '', component: ClassroomUnitsComponent},
    { path: '**', redirectTo: '', pathMatch: 'full' }
  ];

@NgModule({
  imports: [
    CommonModule,
    ClassroomSharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [  
      UnitComponent,
      ClassroomUnitsComponent,
      SectionActivityComponent,
      SectionHtmlComponent,
  ],
  providers: [ 
  ],  
  exports: [
      RouterModule
  ]
})
export class ClassroomUnitsModule {}
