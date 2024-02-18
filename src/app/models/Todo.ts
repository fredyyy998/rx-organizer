export interface Todo {
  id?: string;
  title: string;
  description: string;
  state: TodoProgressState;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
}

export enum TodoProgressState {
  'done',
  'in progress',
  'backlog',
}
