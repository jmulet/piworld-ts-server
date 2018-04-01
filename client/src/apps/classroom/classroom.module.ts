import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';

import { MyHttpInterceptor } from '../../interceptors/MyHttpInterceptor';
import { RestApi } from '../../rest/RestApi';
import { ClassroomSharedModule } from './classroom-shared.module';
import { ClassroomComponent } from './classroom.component';

const routes: Routes = [
  { path: 'units', loadChildren: './unitsModule/classroom-units.module#ClassroomUnitsModule'},
  { path: 'search', loadChildren: './searchModule/classroom-search.module#ClassroomSearchModule'},
  { path: 'activity', loadChildren: './activityModule/classroom-activity.module#ClassroomActivityModule'},
  { path: 'assign', loadChildren: './assignModule/classroom-assign.module#ClassroomAssignModule'},
  { path: '',  redirectTo: 'units', pathMatch: 'full' },
  { path: '**',  redirectTo: 'units', pathMatch: 'full' }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ClassroomSharedModule,
    RouterModule.forRoot(routes, {useHash: true})
  ],
  declarations: [
    ClassroomComponent
  ],
  providers: [
    RestApi, 
    MessageService,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: MyHttpInterceptor, 
      multi: true 
    }
  ],
  bootstrap: [
    ClassroomComponent 
  ]
})
export class ClassroomModule {}
