import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Login } from './login.interface';

@Component({
  selector: 'app-login',
  imports: [MatIconModule,CommonModule,FormsModule,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hidePassword = true;
  model: Login = {
    username: 'admin',
    password: 'admin'
  };

  constructor(private router: Router) {}

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

onSubmit(form: NgForm): void {
  if (form.valid) {
    if (this.model.username === 'admin' && this.model.password === 'admin') {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/index/dashboard']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
}
