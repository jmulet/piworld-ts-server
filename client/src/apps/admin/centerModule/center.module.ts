import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CentersComponent } from './centers.component';
import { CenterEditComponent } from './dialogs/centeredit.component';
import { CenterOptsComponent } from './dialogs/centeropts.component';
import { UserEditComponent } from './dialogs/useredit.component';
import { UsersImportComponent } from './dialogs/usersimport.component';
import { AdminSharedModule } from '../admin-shared.module';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', component: CentersComponent},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
  
@NgModule({
  imports: [
    CommonModule,
    AdminSharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [  
    CentersComponent, 
    CenterEditComponent,
    UserEditComponent,
    CenterOptsComponent,
    UsersImportComponent
  ],
  providers: [  
  ],
  exports: [
    RouterModule
  ] 
})
export class CenterModule {}
