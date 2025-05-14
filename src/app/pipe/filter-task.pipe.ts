import { Pipe, PipeTransform } from '@angular/core';
import { Task } from '../component';

@Pipe({
  name: 'filterTask',
  standalone: true,
})
export class FilterTaskPipe implements PipeTransform {
  transform(tasks: Task[], searchTerm: string): Task[] {
    if (!searchTerm) return tasks;
    return tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}
