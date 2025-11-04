import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ModalService } from '../../../../shared/services/modal.service';
import { extractFieldErrors, formatErrorForModal } from '../../../../shared/utils/error-handler';

@Component({
  selector: 'app-esquecer-senha',
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './esquecer-senha.component.html',
  styleUrl: './esquecer-senha.component.scss'
})
export class EsquecerSenhaComponent {
  resetForm: FormGroup;
  isSubmitting = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private modalService: ModalService
  ) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    // TODO: Implementar chamada real à API quando o endpoint estiver disponível
    // Exemplo:
    // this.authService.resetPassword(this.resetForm.value.email).subscribe({
    //   next: (response) => {
    //     this.modalService.success(
    //       'Link enviado',
    //       'Verifique seu e-mail para redefinir sua senha.'
    //     ).subscribe(() => {
    //       this.navigateToLogin();
    //     });
    //   },
    //   error: (error) => {
    //     console.error('Erro ao enviar link de recuperação:', error);
    //     
    //     // Extrai erros específicos de campos
    //     const fieldErrors = extractFieldErrors(error);
    //     
    //     // Aplica erros aos campos correspondentes
    //     Object.keys(fieldErrors).forEach(field => {
    //       const control = this.resetForm.get(field);
    //       if (control) {
    //         control.setErrors({ backend: fieldErrors[field] });
    //         control.markAsTouched();
    //       }
    //     });
    //
    //     // Formata e exibe modal de erro
    //     const { title, message } = formatErrorForModal(error);
    //     this.modalService.error(title, message).subscribe();
    //
    //     this.isSubmitting = false;
    //   },
    //   complete: () => {
    //     this.isSubmitting = false;
    //   }
    // });

    // Simulação temporária
    console.log('Reset password for:', this.resetForm.value.email);
    setTimeout(() => {
      this.isSubmitting = false;
      this.modalService.success(
        'Link enviado',
        'Verifique seu e-mail para redefinir sua senha.'
      ).subscribe(() => {
        this.navigateToLogin();
      });
    }, 2000);
  }
}
