import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminSharedModule } from '../admin-shared.module'; 
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/components/table/table';
import { ConfirmationService } from 'primeng/api'; 
import {OverlayPanelModule} from 'primeng/components/overlaypanel/overlaypanel';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { FamousComponent } from './famous.component';
import { InputDialogModule } from '../../shared/modules/inputdialog/inputdialog.module';
import { QuoteEditComponent } from './dialogs/quoteedit.component';
import { EquationEditComponent } from './dialogs/equationedit.component';
 
const routes: Routes = [
  { path: '', component: FamousComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    AdminSharedModule,   
    TableModule,
    ConfirmDialogModule,
    OverlayPanelModule,
    CalendarModule,
    InputDialogModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ 
    FamousComponent,
    QuoteEditComponent,
    EquationEditComponent
  ], 
  providers: [ 
    ConfirmationService
  ],
  exports: [
    RouterModule
  ]
})
export class FamousModule {}
