import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { OverlayPanelModule } from 'primeng/components/overlaypanel/overlaypanel';
import { TableModule } from 'primeng/components/table/table';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { AdminSharedModule } from '../admin-shared.module';
import { NewsEditComponent } from './dialogs/newsedit.component';
import { NewsComponent } from './news.component';

 
const routes: Routes = [
  { path: '', component: NewsComponent},
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
    RouterModule.forChild(routes)
  ],
  declarations: [ 
    NewsComponent,
    NewsEditComponent
  ], 
  providers: [ 
    ConfirmationService
  ],
  exports: [
    RouterModule
  ]
})
export class NewsModule {}
