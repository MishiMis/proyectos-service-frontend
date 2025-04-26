import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-seguimiento',
  templateUrl: './agregar-seguimiento.component.html'
})
export class AgregarSeguimientoComponent {
  usuario = {
    nombre: '',
    apellido: '',
    rol: '',
    usuario: '',
    contrasena: ''
  };

  roles = ['Administrador', 'Editor', 'Lector'];

  constructor(
    public dialogRef: MatDialogRef<AgregarSeguimientoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  guardar(): void {
    if (this.validarCampos()) {
      this.dialogRef.close(this.usuario);
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
  
  private validarCampos(): boolean {
    return !!this.usuario.nombre && !!this.usuario.apellido && 
           !!this.usuario.rol && !!this.usuario.usuario && 
           !!this.usuario.contrasena;
  }
}