import { createReducer } from '@ngrx/store';

export interface AppState {}

export const initState: AppState = {};

export const reducer = createReducer(initState);
