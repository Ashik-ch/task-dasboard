import { Component, OnInit } from '@angular/core';
import { Task } from './helper';
import { CommonModule } from '@angular/common';
import { TaskComponent } from '../task/task.component';

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

  ngOnInit(): void {

  }

  onAddTask(): void {
    this.taskModal = true;
  }
}
