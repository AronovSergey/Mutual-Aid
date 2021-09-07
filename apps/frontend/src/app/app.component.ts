import { Component } from '@angular/core';
import { TodoService } from '@mutual-aid/frontend-core/services';
import { ITodo } from '@mutual-aid/interfaces';

@Component({
  selector: 'mutual-aid-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  todos: ITodo[] = [];

  constructor(private todoService: TodoService) {
    this.fetch();
  }

  fetch() {
    this.todoService.getTodos().subscribe(
      (t) => {
        this.todos = t;
    });
  }

  addTodo() {
    this.todoService.addTodo().subscribe(
      (() => { this.fetch(); }) 
    );
  }
}