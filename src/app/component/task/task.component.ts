import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../service/task.service';
import { Task } from '../task-manager';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {

  taskFormGroup!: FormGroup;

  constructor(
    private readonly taskService: TaskService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.taskFormBuilder()
  }

  taskFormBuilder() {
    this.taskFormGroup = this.fb.group({
      titleForm: ['', Validators.required],
      description: [''],
      status: ['todo']
    });
  }

  onSubmit(): void {
    if (this.taskFormGroup.valid) {
      const task: Task = this.taskFormGroup.value;
      this.taskService.addTask(task).subscribe((res) => {
        console.log(res);
      });
    }
  }
}
