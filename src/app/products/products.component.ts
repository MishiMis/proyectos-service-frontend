import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AgregarSeguimientoComponent } from '../componentes/agregar-seguimiento/agregar-seguimiento.component';

@Component({
  selector: 'app-products',
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  constructor(private dialog: MatDialog) {}

  abrirModalAgregarUsuario(): void {
    const dialogRef = this.dialog.open(AgregarSeguimientoComponent, {
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
