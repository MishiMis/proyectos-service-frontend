// add-activity.component.ts
import { Component, Input, OnInit,Inject } from '@angular/core';
import { Activity, UserOption } from './add-activitie.interface';
import { DataService } from '../../../../core/service/data.service';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonSubmitComponent } from '../../../../shared/components/buttons/button-submit.component';
import { InputFieldComponent } from '../../../../shared/components/inputs/input-field.component';

@Component({
  selector: 'app-add-activity',
  imports: [CommonModule,FormsModule,ButtonSubmitComponent,InputFieldComponent,MatDialogModule],
  // standalone: true,
  templateUrl: './add-activitie.component.html',
  styleUrls: ['./add-activitie.component.css']
})
export class AddActivitieComponent implements OnInit {

  availableResponsables: string[] = [];


   formData: Activity = {
    projectId: '',
    name: '',
    description: '',
    priority: 'medio',
    status: 'no_iniciada',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    asignados: [],
    horas_estimadas: 8,
    horas_reales: 0
  };

  loading = false;
  errorMessage = '';
  successMessage = '';

  priorityOptions = [
    { value: 'bajo', label: 'Baja' },
    { value: 'medio', label: 'Media' },
    { value: 'alto', label: 'Alta' }
  ];

  statusOptions = [
    { value: 'no_iniciada', label: 'No Iniciada' },
    { value: 'en_progreso', label: 'En Progreso' },
    { value: 'completada', label: 'Completada' },
  ];

  constructor(
    private dialogRef: MatDialogRef<AddActivitieComponent>,
    private DataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: { projectId: string; availableUsers: UserOption[] }
  ) {}

  ngOnInit() {
    this.formData.projectId = this.data.projectId;
      this.loadResponsables();

  }
  loadResponsables(): void {
  this.DataService.getFirstNames().subscribe({
    next: (names: string[]) => {
      this.availableResponsables = names;
    },
    error: (err) => {
      console.error('Error al cargar responsables:', err);
    }
  });
}

onSubmit() {
  if (!this.formValid()) {
    return;
  }

  this.loading = true;

  this.DataService.createActivity(this.formData)
    .pipe(
      finalize(() => this.loading = false)
    )
    .subscribe({
      next: () => {
        this.dialogRef.close();
      },
      error: () => {
        this.dialogRef.close(); 
      }
    });
}

  resetForm() {
    this.formData = {
projectId: this.data.projectId,
      name: '',
      description: '',
      priority: 'medio',
      status: 'no_iniciada',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      asignados: [],
      horas_estimadas: 8,
      horas_reales: 0
    };
  }

  toggleUserSelection(email: string) {
    const index = this.formData.asignados.indexOf(email);
    if (index >= 0) {
      this.formData.asignados.splice(index, 1);
    } else {
      this.formData.asignados.push(email);
    }
  }

  isUserSelected(email: string): boolean {
    return this.formData.asignados.includes(email);
  }

  formValid(): boolean {
    return !!this.formData.name && 
           !!this.formData.description && 
           !!this.formData.startDate && 
           !!this.formData.endDate;
  }
}