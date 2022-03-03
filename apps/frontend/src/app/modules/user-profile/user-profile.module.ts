import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@mutual-aid/material';
import { UserProfileComponent } from './user-profile.component';



@NgModule({
  declarations: [UserProfileComponent],
  imports: [CommonModule, MaterialModule]
})
export class UserProfileModule { }
