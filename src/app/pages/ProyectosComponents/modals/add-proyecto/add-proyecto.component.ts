import { InputFieldComponent } from '../../../../shared/components/inputs/input-field.component';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

import { 
  ProjectForm, 
  ProjectStatus, 
  StatusOption,
  Contractor 
} from './add-proyecto.interface';
import { ButtonSubmitComponent } from '../../../../shared/components/buttons/button-submit.component';
import { DataService } from '../../../../core/service/data.service';


@Component({
  selector: 'app-add-proyecto',
  imports: [InputFieldComponent, FormsModule, CommonModule,ButtonSubmitComponent],
  // standalone: true,
  templateUrl: './add-proyecto.component.html',
  styleUrl: './add-proyecto.component.css'
})
export class AddProyectoComponent {

   @Output() onSubmitForm = new EventEmitter<ProjectForm>();
  @Output() onCancel = new EventEmitter<void>();

  formData: ProjectForm = {
    name: '',
    description: '',
    status: 'pendiente',
    progress: 0,
    startDate: '',
    endDate: '',
    actualEndDate: null,
    contractors: [{ name: '', contact: '' }],
    responsables: [],
    observaciones: ''
  };

  statusOptions: StatusOption[] = [
    { value: 'en_progreso', label: 'En progreso' },
    { value: 'completado', label: 'Completado' },
    { value: 'cancelado', label: 'Cancelado' }
  ];

  availableResponsables: string[] = [];

  constructor(private dataService: DataService,    private dialogRef: MatDialogRef<AddProyectoComponent>, private dialog: MatDialog
) {}

  ngOnInit(): void {
    this.loadResponsables();
  }

  loadResponsables(): void {
    this.dataService.getFirstNames().subscribe({
      next: (names: string[]) => {
        this.availableResponsables = names;
      },
      error: (err) => {
        console.error('Error al cargar responsables:', err);
      }
    });
  }

  formValid(): boolean {
    return !!(
      this.formData.name.trim() &&
      this.formData.description.trim() &&
      this.formData.startDate &&
      this.formData.endDate
    );
  }

  addContractor() {
    this.formData.contractors.push({ name: '', contact: '' });
  }

  removeContractor(index: number) {
    this.formData.contractors.splice(index, 1);
  }
onSubmit() { 
  if (!this.formValid()) {
    console.log('Formulario no válido');
    return;
  }

  const submitData = {
    ...this.formData,
    actualEndDate: this.formData.status === 'completado' ? new Date().toISOString().split('T')[0] : null,
    progress: this.formData.status === 'completado' ? 100 : this.formData.status === 'pendiente' ? 0 : this.formData.progress
  };

  console.log('Enviando datos:', submitData);

  this.dataService.createProject(submitData).subscribe({
    next: (response) => {
      console.log('Proyecto creado:', response);
      this.onSubmitForm.emit(response);
      this.dialogRef.close(response); 
    },
    error: (err) => {
      console.error('Error al crear proyecto:', err);
    }
  });
}

cancel() {
  this.dialogRef.close(); 
}
}
