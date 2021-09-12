import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteNames } from './route-names';
import { RegistrationComponent } from '../modules/registration/components/registration/registration.component';
import { LoginComponent } from '../modules/login/components/login/login.component';

const routes: Routes = [
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

