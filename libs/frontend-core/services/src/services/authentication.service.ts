import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { HttpService } from '@mutual-aid/frontend-core/http'
import { IToken, ILoginForm, IUser } from '@mutual-aid/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpService
  ) { }

  login(loginForm: ILoginForm): Observable<IToken>{
    return this.http.login(loginForm.email, loginForm.password).pipe(
      map((token: IToken) => {
        localStorage.setItem('mutual-aid-token', token.access_token);
        return token;
      })
    );
  }

  register(user: IUser): Observable<IUser> {
    return this.http.register(user).pipe(
      tap((user: IUser) => user)
    )
  }
}
