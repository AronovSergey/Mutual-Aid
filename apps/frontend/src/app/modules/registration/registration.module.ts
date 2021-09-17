import { MaterialModule } from '@mutual-aid/material';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule, 
  ]
})
export class RegistrationModule { }
