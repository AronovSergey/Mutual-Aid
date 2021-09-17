import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FrontendRoutingModule } from './routes/frontend-routing.module';
import { RegistrationModule } from './modules/registration/registration.module';
import { LoginModule } from './modules/login/login.module';
import { UiModule } from '@mutual-aid/ui'

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
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
