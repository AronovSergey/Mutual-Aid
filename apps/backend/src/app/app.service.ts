import { Injectable } from '@nestjs/common';
import { ITodo } from '@mutual-aid/interfaces';

@Injectable()
export class AppService {
  todos: ITodo[] = [{ title: 'Todo 1' }, { title: 'Todo 2' }];

  getTodos(): ITodo[] {
    return this.todos;
  }

  addTodo() {
    this.todos.push({
      title: `New todo ${Math.floor(Math.random() * 1000)}`,
    });
  }
}