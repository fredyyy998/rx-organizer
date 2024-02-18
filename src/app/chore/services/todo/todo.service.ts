import { Injectable } from '@angular/core';
import { SupabaseService } from '../supabase/supabase.service';
import { from, map, throwError } from 'rxjs';
import { Todo } from '../../../models/Todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private readonly supabaseService: SupabaseService) {}

  todos() {
    return from(this.supabaseService.supabase.from('todo').select('*')).pipe(
      map(res => {
        if (res.error && res.status !== 406) {
          throwError(res.error);
        }
        return res.data as Todo[];
      })
    );
  }

  updateTodo(todo: Todo) {
    const update = {
      ...todo,
      updatedAt: new Date(),
    };

    return from(this.supabaseService.supabase.from('todo').upsert(update)).pipe(
      map(res => {
        if (res.error && res.status !== 406) {
          throwError(res.error);
        }
        return todo;
      })
    );
  }
}
