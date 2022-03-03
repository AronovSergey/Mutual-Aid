import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@mutual-aid/material';

import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [RegistrationComponent, LoginComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule]
})
export class AuthModule { }
