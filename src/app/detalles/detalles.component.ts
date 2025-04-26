import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detalles',
  imports: [],
  templateUrl: './detalles.component.html',
  styleUrl: './detalles.component.css'
})
export class DetallesComponent {
  constructor(private dialogRef: MatDialogRef<DetallesComponent>) {}

  cerrarModal(): void {
    this.dialogRef.close();
  }

}
