import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './components/overview/overview.component';
import { UsersComponent } from './components/users/users.component';
import { MaterialModule } from '@mutual-aid/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OverviewComponent, UsersComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
})
export class AdminModule {}
