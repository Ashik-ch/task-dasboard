import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../task-manager';
import { TaskService } from '../../service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  taskFormGroup!: FormGroup;
  submitted = false;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.taskFormBuilder()
  }

  taskFormBuilder() {
    this.taskFormGroup = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['todo']
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.taskFormGroup.invalid) return;
    const task: Task = this.taskFormGroup.value;
    this.taskService.addTask(task).subscribe({
      next: (res) => {
        this.closeModal.emit();
      },
      error: (err) => console.error(err)
    });
  }

  onCancel(): void {
    this.closeModal.emit();
  }
}
