import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'daysUntil',
  standalone: true,
})
export class DaysUntilPipe implements PipeTransform {
  transform(value: Date): number {
    const today = new Date();
    return Math.round(
      (value.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
  }
}
