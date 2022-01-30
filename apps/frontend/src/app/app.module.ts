import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiModule } from '@mutual-aid/ui';

import { AppComponent } from './app.component';
// modules
import { FrontendRoutingModule } from './routes/frontend-routing.module';
import { RegistrationModule } from './modules/registration/registration.module';
import { LoginModule } from './modules/login/login.module';
import { AdminModule } from './modules/admin/admin.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    UiModule,
    FrontendRoutingModule,
    RegistrationModule,
    LoginModule,
    AdminModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
