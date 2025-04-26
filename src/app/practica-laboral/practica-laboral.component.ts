import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DetallesComponent } from '../detalles/detalles.component';
import { PostulacionesComponent } from '../postulaciones/postulaciones.component';

@Component({
  selector: 'app-practica-laboral',
  imports: [],
  templateUrl: './practica-laboral.component.html',
  styleUrl: './practica-laboral.component.css'
})
export class PracticaLaboralComponent {
  constructor(private dialogRef: MatDialogRef<PracticaLaboralComponent>,private dialog: MatDialog) {}

  cerrarModal(): void {
    this.dialogRef.close();
  }
    
      abrirModalDetalles(): void {
        const dialogRef = this.dialog.open(DetallesComponent, {
          width: '500px',
          panelClass: 'custom-dialog',
          autoFocus: false
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log('Usuario guardado:', result);
          }
        });
      }
          
      abrirModalPostulaciones(): void {
        const dialogRef = this.dialog.open(PostulacionesComponent, {
          width: '500px',
          panelClass: 'custom-dialog',
          autoFocus: false
        });
    
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            console.log('Usuario guardado:', result);
          }
        });
      }

}
