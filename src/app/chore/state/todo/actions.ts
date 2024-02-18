import { createAction, props } from '@ngrx/store';
import { Todo } from '../../../models/Todo';

export const loadTodoList = createAction('[todo] loadTodoList');

export const loadTodoListSuccess = createAction(
  '[todo] loadTodoListSuccess',
  props<{ todos: Todo[] }>()
);

export const updateTodo = createAction(
  '[todo] updateTodo',
  props<{ todo: Todo }>()
);

export const updateTodoSuccess = createAction(
  '[todo] updateTodoSuccess',
  props<{ todo: Todo }>()
);
