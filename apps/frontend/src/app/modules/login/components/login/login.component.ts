import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@mutual-aid/frontend-core/services';
import { IToken } from '@mutual-aid/interfaces';

@Component({
  selector: 'mutual-aid-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  constructor(
    private authService: AuthenticationService
  ) { }

  login() {
    this.authService.login('sergey@gmail.com', '123456').subscribe(
      (token: IToken) => {
        console.log(token);
      }
    )
  }
}
