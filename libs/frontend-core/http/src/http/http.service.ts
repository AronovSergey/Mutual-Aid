import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITodo } from '@mutual-aid/interfaces';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private TODOS = '/todos';
  
  private baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = '/api';
  }

  // -- TODO --
  public getTodos(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(this.baseUrl + this.TODOS);
  }

  public addTodo(): Observable<void> {
    return this.http.post<void>(this.baseUrl + this.TODOS, {});
  }
}
