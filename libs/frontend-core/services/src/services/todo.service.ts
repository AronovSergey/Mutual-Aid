import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { HttpService } from '@mutual-aid/frontend-core/http';
import { ITodo } from '@mutual-aid/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpService) { }

  getTodos(): Observable<ITodo[]> {
    return this.http.getTodos().pipe(
      tap((todos: ITodo[]) => todos)
    );
  }

  addTodo(): Observable<void> {
    return this.http.addTodo().pipe(
      tap((): void => undefined)
    );
  }

}
