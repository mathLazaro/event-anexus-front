import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-esquecer-senha',
  imports: [],
  templateUrl: './esquecer-senha.component.html',
  styleUrl: './esquecer-senha.component.scss'
})
export class EsquecerSenhaComponent {

  constructor(private router: Router) { }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
