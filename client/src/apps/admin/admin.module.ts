import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { MyHttpInterceptor } from '../../interceptors/MyHttpInterceptor';
import { AdminSharedModule } from './admin-shared.module';
import { AdminComponent } from './admin.component';


const appRoutes: Routes = [
  { path: 'centers', loadChildren: './centerModule/center.module#CenterModule'},
  { path: 'courses', loadChildren: './courseModule/course.module#CourseModule'},
  { path: '',  redirectTo: 'centers', pathMatch: 'full' },
  { path: '**',  redirectTo: 'centers', pathMatch: 'full' }
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule, 
    BrowserAnimationsModule,
    CommonModule, 
    AdminSharedModule, 
    RouterModule.forRoot(appRoutes, {useHash: true}),    
  ],
  declarations: [ 
    AdminComponent 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: MyHttpInterceptor, 
      multi: true 
    }
  ],
  bootstrap: [
    AdminComponent 
  ],
  exports: [
    RouterModule,
    AdminSharedModule
  ]
})
export class AdminModule {}
