import { Component, Inject } from '@angular/core';
import { InputFieldComponent } from '../../../../shared/components/inputs/input-field.component';
import { ButtonSubmitComponent } from '../../../../shared/components/buttons/button-submit.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RegistrationForm } from './add-usuario.interface';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../../core/service/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-usuario',
  standalone: true,
  imports: [InputFieldComponent, ButtonSubmitComponent, FormsModule],
  templateUrl: './add-usuario.component.html',
  styleUrl: './add-usuario.component.css'
})
export class AddUsuarioComponent {
  formData: RegistrationForm = this.initFormData();
  isLoading = false;

  constructor(
    public dialogRef: MatDialogRef<AddUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: DataService,
    private snackBar: MatSnackBar
  ) {}

  private initFormData(): RegistrationForm {
    return {
      username: '',
      password: '',
      personalData: {
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        dni: '',
        birthDate: ''
      }
    };
  }

  get formValid(): boolean {
    const { username, password, personalData } = this.formData;
    return !!(
      username?.trim() &&
      password?.trim() &&
      personalData.firstName?.trim() &&
      personalData.lastName?.trim() &&
      personalData.address?.trim() &&
      personalData.phone?.trim() &&
      personalData.dni?.trim() &&
      personalData.birthDate
    );
  }

  onSubmit(): void {
    if (!this.formValid || this.isLoading) return;

    this.isLoading = true;
    const formattedData = this.formatRequestData();

    this.dataService.createUser(formattedData).subscribe({
      next: (response) => this.handleSuccess(response),
      error: (error) => this.handleError(error)
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private formatRequestData() {
    return {
      ...this.formData,
      personalData: {
        ...this.formData.personalData,
        birthDate: this.formatDate(this.formData.personalData.birthDate)
      }
    };
  }

  private formatDate(dateString: string): string {
    return dateString ? new Date(dateString).toISOString().split('T')[0] : '';
  }

  private handleSuccess(response: any): void {
    this.isLoading = false;
    this.snackBar.open('Usuario creado exitosamente', 'Cerrar', { duration: 3000 });
    this.dialogRef.close(response);
  }

  private handleError(error: any): void {
    this.isLoading = false;
    this.snackBar.open(
      `Error al crear usuario: ${error.message || 'Error desconocido'}`,
      'Cerrar',
      { duration: 5000 }
    );
    console.error('Error detallado:', error);
  }
}