import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from './add-task.interface'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonSubmitComponent } from '../../../../shared/components/buttons/button-submit.component';
import { InputFieldComponent } from '../../../../shared/components/inputs/input-field.component';
import { DataService } from '../../../../core/service/data.service';

@Component({
  selector: 'app-add-task',
    standalone: true,
  imports:[CommonModule,FormsModule,ButtonSubmitComponent,InputFieldComponent],
  templateUrl: './add-task.component.html',
})
export class AddTaskComponent {
 task: Task;
  availableUsers: string[] = [];

  constructor(
    private dataService: DataService,
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { activityId: string }
  ) {
    this.task = {
      activityId: this.data.activityId,
      title: '',
      description: '',
      prioridad: '',
      fecha_limite: '',
      instrucciones: '',
      asignados: [],
      status: 'pendiente'
    };
  }

  ngOnInit(): void {
    this.dataService.getFirstNames().subscribe({
      next: (names: string[]) => {
        this.availableUsers = names;
      },
      error: (err) => {
        console.error('Error cargando nombres:', err);
      }
    });
  }

  submit(): void {
    console.log('Enviando a API:', this.task);
    this.dataService.createTask(this.task).subscribe({
      next: (res) => {
        console.log('Tarea creada:', res);
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error creando tarea:', err);
      }
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}

