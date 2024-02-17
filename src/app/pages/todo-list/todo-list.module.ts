import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoListRoutingModule } from './todo-list-routing.module';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DaysUntilPipe } from '../../chore/pipes/days-until.pipe';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [TodoListComponent],
  imports: [
    CommonModule,
    TodoListRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DaysUntilPipe,
    MatMenuModule,
  ],
})
export class TodoListModule {}
