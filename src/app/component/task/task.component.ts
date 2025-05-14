import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, output, Output } from '@angular/core';
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
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
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
      title: ['', Validators.required],
      description: [''],
      status: ['todo']
    });
  }

  onSubmit(): void {
    console.log(
      "this.taskFormGroup.value", this.taskFormGroup.value
    );

    if (this.taskFormGroup.valid) {
      const task: Task = this.taskFormGroup.value;
      this.taskService.addTask(task).subscribe((res) => {
        this.closeModal.emit();
        console.log(res);
      });
    }
  }

  onCancel() {
    this.closeModal.emit();
  }
}
