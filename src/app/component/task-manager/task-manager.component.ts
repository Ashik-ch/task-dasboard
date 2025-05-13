import { Component } from '@angular/core';
import { Task } from './helper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-manager.component.html',
  styleUrl: './task-manager.component.css'
})
export class TaskManagerComponent {
  todo: Task[] = [];
  inProgress: Task[] = [];
  done: Task[] = [];


  ngOnInit(): void {
  }

}