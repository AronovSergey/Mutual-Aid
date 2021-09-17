import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@mutual-aid/material';
import { LoginComponent } from './components/login/login.component';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule, 
  ]
})
export class LoginModule { }
