import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteNames } from '@mutual-aid/frontend-core';
import { AuthGuard } from '@mutual-aid/frontend-core/guards';

// components
import { RegistrationComponent } from '../modules/registration/registration.component';
import { LoginComponent } from '../modules/login/login.component';
import { OverviewComponent } from '../modules/admin/components/overview/overview.component';
import { UsersComponent } from '../modules/admin/components/users/users.component';
import { UpdateUserProfileComponent } from '../modules/update-user-profile/update-user-profile.component';

const routes: Routes = [
  {
    path: RouteNames.ADMIN,
    component: OverviewComponent,
  },
  {
    path: RouteNames.REGISTRATION,
    component: RegistrationComponent,
  },
  {
    path: RouteNames.LOGIN,
    component: LoginComponent,
  },
  {
    path: RouteNames.USERS,
    component: UsersComponent,
  },
  {
    path: RouteNames.UPDATE_PROFILE,
    component: UpdateUserProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/' + RouteNames.LOGIN, pathMatch: 'full' },
  { path: '', redirectTo: RouteNames.LOGIN, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class FrontendRoutingModule {}
