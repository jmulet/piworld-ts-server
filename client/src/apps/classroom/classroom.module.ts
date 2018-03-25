import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MessageService } from 'primeng/components/common/messageservice';

import { MyHttpInterceptor } from '../../interceptors/MyHttpInterceptor';
import { RestApi } from '../../rest/RestApi';
import { UserActionsComponent } from '../shared/components/userActions.component';
import { UsersOnlineComponent } from '../shared/components/usersOnline.component';
import { SocketService } from '../shared/services/socket.service';
import { ClassroomSharedModule } from './classroom-shared.module';
import { ClassroomComponent } from './classroom.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    RouterModule.forRoot(routes)
  ],
  declarations: [
    ClassroomComponent,
    UsersOnlineComponent,
    UserActionsComponent, 
  ],
  providers: [
    RestApi,
    SocketService,  
    MessageService,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: MyHttpInterceptor, 
      multi: true 
    }
  ],
  bootstrap: [
    ClassroomComponent,
    UsersOnlineComponent,
    UserActionsComponent
  ]
})
export class ClassroomModule {}
