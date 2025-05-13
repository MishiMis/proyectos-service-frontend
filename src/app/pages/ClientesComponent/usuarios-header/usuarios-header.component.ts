import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ButtonComponent } from '../../../shared/components/buttons/button.click.component';
import { AddUsuarioComponent } from '../modals/add-usuario/add-usuario.component';

@Component({
  selector: 'app-usuarios-header',
  imports: [CommonModule,ButtonComponent],
  templateUrl: './usuarios-header.component.html',
  styleUrl: './usuarios-header.component.css'
})
export class UsuariosHeaderComponent {

    constructor(public dialog: MatDialog) {}

      openModal(): void {
    const dialogRef = this.dialog.open(AddUsuarioComponent, {
      width: '500px',

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('El modal fue cerrado');

    });
  }

}
