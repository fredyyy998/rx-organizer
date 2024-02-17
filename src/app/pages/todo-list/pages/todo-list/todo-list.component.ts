import { Component } from '@angular/core';
import { of } from 'rxjs';
import { Todo } from '../../../../models/Todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  todos$ = of<Todo[]>([
    {
      title: 'Todo create page',
      description: 'Build, design and state flow for todo create page',
      createdAt: new Date(),
      dueDate: new Date(1710703969000),
      state: 'backlog',
    },
  ]);
}
