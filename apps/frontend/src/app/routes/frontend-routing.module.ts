import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteNames } from '@mutual-aid/frontend-core';
import { RegistrationComponent } from '../modules/registration/components/registration/registration.component';
import { LoginComponent } from '../modules/login/components/login/login.component';
import { AdminOverviewComponent } from '../modules/admin/components/overview/overview.component';

const routes: Routes = [
  {
    path: RouteNames.ADMIN,
    component: AdminOverviewComponent,
  },
  {
    path: RouteNames.REGISTRATION,
    component: RegistrationComponent,
  },
  {
    path: RouteNames.LOGIN,
    component: LoginComponent,
  },
  { path: '**', redirectTo: '/' + RouteNames.LOGIN, pathMatch: 'full' },
  { path: '', redirectTo: RouteNames.LOGIN, pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class FrontendRoutingModule { }

