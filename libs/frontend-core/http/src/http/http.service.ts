import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IToken, IUser } from '@mutual-aid/interfaces';
import { Pagination } from 'nestjs-typeorm-paginate';

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
  public getAllUsers(page: number, limit: number, username?: string): Observable<Pagination<IUser>> {
    const params: { page: number, limit: number, username?: string } = { page, limit };
    if(username) {
      params.username = username;
    }

    return this.http.get<Pagination<IUser>>(this.baseUrl + '/' + this.USERS, { params });
  }

  public login(email: string, password: string): Observable<IToken> {
    return this.http.post<IToken>(this.baseUrl + '/' + this.USERS + '/' + this.LOGIN, { email, password });
  }

  public register(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(this.baseUrl + '/' + this.USERS, user);
  }
}
