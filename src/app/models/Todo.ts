export interface Todo {
  id?: string;
  title: string;
  description: string;
  state: 'done' | 'in progress' | 'backlog';
  createdAt: Date;
  dueDate?: Date;
}
