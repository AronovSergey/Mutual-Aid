import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { UiModule } from '@mutual-aid/ui';
import { JwtInterceptor } from '@mutual-aid/frontend-core/interceptors';
// modules
import { FrontendRoutingModule } from './routes/frontend-routing.module';
import { AuthModule } from './modules/auth/auth.module';
import { AdminModule } from './modules/admin/admin.module';
import { UpdateUserProfileModule } from './modules/update-user-profile/update-user-profile.module';
import { UserProfileModule } from './modules/user-profile/user-profile.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UiModule,
    FrontendRoutingModule,
    AuthModule,
    AdminModule,
    UpdateUserProfileModule,
    UserProfileModule,
  ],
  providers: [
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
