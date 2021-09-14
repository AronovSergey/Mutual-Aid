import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouteNames } from '@mutual-aid/frontend-core';

@Component({
  selector: 'mutual-aid-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent  {

  public RouteNames = RouteNames;

  constructor(
    private router: Router,
  ) { }

}
