import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { TableModule } from 'primeng/components/table/table';

import { AdminSharedModule } from '../admin-shared.module';
import { ChallengesComponent } from './challenges.component';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { ChallengeEditComponent } from './dialogs/challengeedit.component';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';

const routes: Routes = [
  { path: '', component: ChallengesComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    AdminSharedModule,   
    TableModule,
    ConfirmDialogModule, 
    CalendarModule, 
    TriStateCheckboxModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ 
    ChallengesComponent,
    ChallengeEditComponent
  ], 
  providers: [ 
    ConfirmationService
  ],
  exports: [
    RouterModule
  ]
})
export class ChallengesModule {}
