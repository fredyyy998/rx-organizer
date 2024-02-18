import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { TodoSlice } from '../../../../chore/state/todo/reducer';
import { selectTodoList } from '../../../../chore/state/todo/selectors';
import { loadTodoList } from '../../../../chore/state/todo/actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  private store = inject<Store<TodoSlice>>(Store);
  todos$ = this.store.select(selectTodoList);

  constructor() {
    this.store.dispatch(loadTodoList());
  }
}
