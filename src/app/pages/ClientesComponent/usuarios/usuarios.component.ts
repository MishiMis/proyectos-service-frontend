import { Component } from '@angular/core';
import { UsuariosHeaderComponent } from '../usuarios-header/usuarios-header.component';
import { TablaUsuarioComponent } from '../tabla-usuario/tabla-usuario.component';

@Component({
  selector: 'app-usuarios',
  imports: [UsuariosHeaderComponent,TablaUsuarioComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  

}
