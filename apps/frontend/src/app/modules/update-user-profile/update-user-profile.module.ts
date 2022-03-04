import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@mutual-aid/material';
import { UpdateUserProfileComponent } from './update-user-profile.component';



@NgModule({
  declarations: [UpdateUserProfileComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule]
})
export class UpdateUserProfileModule { }
