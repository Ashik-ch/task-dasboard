import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from './helper';
import { TaskComponent } from '../task/task.component';
import { TaskService } from '../../service/task.service';
import { FormsModule } from '@angular/forms';
import { CdkDragDrop, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [CommonModule, TaskComponent, FormsModule, DragDropModule],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.css'
})
export class TaskManagerComponent implements OnInit {
  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];
  taskModalVisible = false;
  openDropdown: { list: string; index: number } | null = null;

  constructor(
    private readonly taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.getAllTask();
  }

  getAllTask(): void {
    this.taskService.getTasks().subscribe((res: any[]) => {
      const tasks: Task[] = res.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
      }));

      this.todo = tasks.filter(t => t.status === 'todo');
      this.inProgress = tasks.filter(t => t.status === 'inProgress');
      this.done = tasks.filter(t => t.status === 'done');
    });
  }

  onAddTask(): void {
    this.taskModalVisible = true;
  }

  onCloseModal(): void {
    this.taskModalVisible = false;
    this.getAllTask();
  }

  onStatusChange(task: Task, newStatus: 'todo' | 'inProgress' | 'done'): void {
    const updatedTask = { ...task, status: newStatus };
    this.taskService.updateTask(updatedTask.id, updatedTask).subscribe(() => {
      this.getAllTask();
    });
  }

  onDrop(event: CdkDragDrop<Task[]>, newStatus: 'todo' | 'inProgress' | 'done'): void {
    if (event.previousContainer === event.container) {
      return;
    }
    const movedTask = event.previousContainer.data[event.previousIndex];
    movedTask.status = newStatus;
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    this.taskService.updateTask(movedTask.id, movedTask).subscribe(() => {
    });
  }


}

