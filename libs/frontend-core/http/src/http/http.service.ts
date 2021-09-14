import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IToken } from '@mutual-aid/interfaces';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private USERS = 'users';
  private LOGIN = 'login';

  private baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = 'api';
  }

  // -- Users --
  public login(email: string, password: string): Observable<IToken> {
    return this.http.post<IToken>(this.baseUrl + '/' + this.USERS + '/' + this.LOGIN, { email, password });
  }
}
