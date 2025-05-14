import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../../service';
import { Task } from './helper';
import { TaskComponent } from '../task/';

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule, TaskComponent],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.css',
})
export class TaskManagerComponent implements OnInit {
  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];
  taskModalVisible = false;
  openDropdown: { list: string; index: number } | null = null;

  constructor(private readonly taskService: TaskService) { }

  ngOnInit(): void {
    this.getAllTask();
  }

  /** Fetches all tasks from the API */
  getAllTask(): void {
    this.taskService.getTasks().subscribe((tasks: Task[]) => {
      this.todo = this.filterTasksByStatus(tasks, 'todo');
      this.inProgress = this.filterTasksByStatus(tasks, 'inProgress');
      this.done = this.filterTasksByStatus(tasks, 'done');
    });
  }

  /**
   * Filters a given list of tasks by their status.
   * @param tasks - The array of tasks to filter.
   * @param status - The status to filter by (todo, inProgress, done).
 */
  filterTasksByStatus(tasks: Task[], status: Task['status']): Task[] {
    return tasks.filter(task => task.status === status)
      .map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
      }));
  }

  /** Opens the modal to add a new task. */
  onAddTask(): void {
    this.taskModalVisible = true;
  }

  /** Closes the task modal and refreshes the task list. */
  onModalClosed(reason: 'submit' | 'cancel'): void {
    this.taskModalVisible = false;
    if (reason === 'submit') {
      this.getAllTask();
    }
  }

  /**
   * Updates a task's status via the dropdown action.
   * @param task - The task to update.
   * @param newStatus - The new status to assign.
   */
  onStatusChange(task: Task, newStatus: Task['status']): void {
    const updatedTask = { ...task, status: newStatus };
    this.taskService.updateTask(task.id, updatedTask).subscribe(() => {
      this.getAllTask();
    });
  }

  /** Handles status updates via drag-and-drop action. */
  onDrop(event: CdkDragDrop<Task[]>, newStatus: Task['status']): void {
    if (event.previousContainer === event.container) return;
    const movedTask = event.previousContainer.data[event.previousIndex];
    movedTask.status = newStatus;
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    this.taskService.updateTask(movedTask.id, movedTask).subscribe();
  }
}
