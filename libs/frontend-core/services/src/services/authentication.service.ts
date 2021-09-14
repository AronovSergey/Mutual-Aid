import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpService } from '@mutual-aid/frontend-core/http'
import { IToken } from '@mutual-aid/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpService
  ) { }

  login(email: string, password: string){
    return this.http.login(email, password).pipe(
      map((token: IToken) => {
        localStorage.setItem('mutual-aid-token', token.access_token);
        return token;
      })
    );
  }
}
