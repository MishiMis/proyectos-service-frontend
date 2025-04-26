import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-postulaciones',
  imports: [],
  templateUrl: './postulaciones.component.html',
  styleUrl: './postulaciones.component.css'
})
export class PostulacionesComponent {
  constructor(private dialogRef: MatDialogRef<PostulacionesComponent>,private dialog: MatDialog) {}

  cerrarModal(): void {
    this.dialogRef.close();
  }

}
