import { Component } from '@angular/core';
import { InputFieldComponent } from '../../../../shared/components/inputs/input-field.component';
import { ButtonSubmitComponent } from '../../../../shared/components/buttons/button-submit.component';

@Component({
  selector: 'app-add-usuario',
  imports: [InputFieldComponent,ButtonSubmitComponent],
  templateUrl: './add-usuario.component.html',
  styleUrl: './add-usuario.component.css'
})
export class AddUsuarioComponent {

}
