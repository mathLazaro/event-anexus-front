import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  standalone: true
})
export class LoginComponent {

  constructor(public router: Router) { }

  navigateToCadastro() {
    this.router.navigate(['/cadastro']);
  }
  navigateToEsquecerSenha() {
    this.router.navigate(['/esquecer-senha']);
  }
}
