import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteNames } from '@mutual-aid/frontend-core';
import { AuthGuard } from '@mutual-aid/frontend-core/guards';

// components
import { OverviewComponent } from '../modules/admin/components/overview/overview.component';
import { UsersComponent } from '../modules/admin/components/users/users.component';
import { LoginComponent } from '../modules/auth/login/login.component';
import { RegistrationComponent } from '../modules/auth/registration/registration.component';
import { UpdateUserProfileComponent } from '../modules/update-user-profile/update-user-profile.component';
import { UserProfileComponent } from '../modules/user-profile/user-profile.component';

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
    path: RouteNames.USERS + '/:' + RouteNames.ID,
    component: UserProfileComponent,
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
