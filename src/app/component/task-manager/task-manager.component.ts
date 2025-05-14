import { Component, OnInit } from '@angular/core';
import { Task } from './helper';
import { CommonModule } from '@angular/common';
import { TaskComponent } from '../task/task.component';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [CommonModule, TaskComponent],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.css'
})
export class TaskManagerComponent implements OnInit {
  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];
  taskModal = false;

  constructor(
    private readonly taskService: TaskService
  ) { }
  ngOnInit(): void {
    this.getAllTask();
  }

  getAllTask() {
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
    this.taskModal = true;
  }
}
