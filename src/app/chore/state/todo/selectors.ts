import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TODO_FEATURE_KEY, TodoState } from './reducer';

export const selectTodo = createFeatureSelector<TodoState>(TODO_FEATURE_KEY);

export const selectTodoList = createSelector(selectTodo, todo => todo.todos);
