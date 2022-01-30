import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@mutual-aid/material';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [CommonModule, BrowserModule, MaterialModule, RouterModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class UiModule {}
