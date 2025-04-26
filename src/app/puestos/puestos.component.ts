import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarPuestoComponent } from '../agregar-puesto/agregar-puesto.component';
import { PracticaLaboralComponent } from '../practica-laboral/practica-laboral.component';

@Component({
  selector: 'app-puestos',
  imports: [],
  templateUrl: './puestos.component.html',
  styleUrl: './puestos.component.css'
})
export class PuestosComponent {

    constructor(private dialog: MatDialog) {}
  
    abrirModalAgregarPuesto(): void {
      const dialogRef = this.dialog.open(AgregarPuestoComponent, {
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

    abrirModalVerPracticas(): void {
      console.log('Intentando abrir modal...'); // ← Verifica si aparece en consola

      const dialogRef = this.dialog.open(PracticaLaboralComponent, {
        width: '500px',
        autoFocus: false
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Usuario guardado:', result);
        }
      });
    }

}
