import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpService } from '@mutual-aid/frontend-core/http';
import { IToken, ILoginForm, IUser } from '@mutual-aid/interfaces';
import { constants } from '@mutual-aid/frontend-core/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  constructor(
    private readonly httpService: HttpService,
    private readonly jwtHelper: JwtHelperService,
  ) { }

  public login(loginForm: ILoginForm): Observable<IToken> {
    return this.httpService.login(loginForm.email, loginForm.password).pipe(
      map((token: IToken) => {
        localStorage.setItem(constants.JWT_TOKEN_NAME, token.access_token);
        return token;
      })
    );
  }

  public register(user: IUser): Observable<IUser> {
    return this.httpService.register(user).pipe(tap((user: IUser) => user));
  }

  public isAuthenticated(): boolean {
    const token: string | null = localStorage.getItem(constants.JWT_TOKEN_NAME);
    return (token) ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  public getActiveUser(): IUser | undefined {
    const token: string | null = localStorage.getItem(constants.JWT_TOKEN_NAME);
    if (!token) {
      return ;
    }
    return this.jwtHelper.decodeToken(token).user;
  }

}
