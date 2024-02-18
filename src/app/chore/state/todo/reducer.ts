import { Todo } from '../../../models/Todo';
import { createFeature, createReducer, on } from '@ngrx/store';
import { loadTodoListSuccess, updateTodoSuccess } from './actions';

export const TODO_FEATURE_KEY = 'todo';

export interface TodoSlice {
  [TODO_FEATURE_KEY]: TodoState;
}

export interface TodoState {
  todos: Todo[];
}

export const initialState: TodoState = {
  todos: [],
};

export const todoFeature = createFeature({
  name: TODO_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(loadTodoListSuccess, (state, action) => {
      return { ...state, todos: action.todos };
    }),
    on(updateTodoSuccess, state => {
      return { ...state }; // TODO automate to go into loadTodos again?
    })
  ),
});
