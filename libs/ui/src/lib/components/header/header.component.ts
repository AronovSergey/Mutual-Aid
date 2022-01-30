import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouteNames } from '@mutual-aid/frontend-core';

@Component({
  selector: 'mutual-aid-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public RouteNames = RouteNames;
  public entries = [
    {
      name: 'Login',
      link: RouteNames.LOGIN,
    },
    {
      name: 'Register',
      link: RouteNames.REGISTRATION,
    },
  ];

  constructor(private router: Router) {}

  navigateTo(value: string) {
    this.router.navigate(['../', value]);
  }
}
