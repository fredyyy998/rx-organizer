import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoService } from '../../services/todo/todo.service';
import {
  loadTodoList,
  loadTodoListSuccess,
  updateTodo,
  updateTodoSuccess,
} from './actions';
import { map, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodoEffects {
  loadTodoList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodoList),
      switchMap(() => this.todoService.todos()),
      map(todos =>
        loadTodoListSuccess({
          todos,
        })
      )
    )
  );

  updateTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTodo),
      switchMap(a => this.todoService.updateTodo(a.todo)),
      map(todo =>
        updateTodoSuccess({
          todo,
        })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) {}
}
