import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ModalService } from '../../../../shared/services/modal.service';
import { AuthService } from '../../../../core/services/auth.service';
import { extractFieldErrors, formatErrorForModal } from '../../../../shared/utils/error-handler';

@Component({
  selector: 'app-esquecer-senha',
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent],
  templateUrl: './esquecer-senha.component.html',
  styleUrl: './esquecer-senha.component.scss'
})
export class EsquecerSenhaComponent {
  resetForm: FormGroup;
  verifyForm: FormGroup;
  isSubmitting = false;
  isVerifyStep = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private modalService: ModalService,
    private authService: AuthService
  ) {
    // Formulário para solicitar reset de senha
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    // Formulário para verificar token e definir nova senha
    this.verifyForm = this.fb.group({
      token: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  // Validador customizado para conferir se as senhas são iguais
  passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
    const newPassword = group.get('newPassword')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      return { passwordsMismatch: true };
    }
    return null;
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  // Envia solicitação de reset de senha
  onSubmitReset() {
    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const email = this.resetForm.value.email;

    this.authService.requestPasswordReset(email).subscribe({
      next: (response) => {
        console.log('Reset solicitado com sucesso:', response);
        this.modalService.success(
          'Token enviado',
          'Verifique seu e-mail.'
        ).subscribe(() => {
          // Avança para a etapa de verificação
          this.isVerifyStep = true;
          this.isSubmitting = false;
        });
      },
      error: (error) => {
        console.error('Erro ao solicitar reset de senha:', error);

        // Extrai erros específicos de campos
        const fieldErrors = extractFieldErrors(error);

        // Aplica erros aos campos correspondentes
        Object.keys(fieldErrors).forEach(field => {
          const control = this.resetForm.get(field);
          if (control) {
            control.setErrors({ backend: fieldErrors[field] });
            control.markAsTouched();
          }
        });

        // Formata e exibe modal de erro
        const { title, message } = formatErrorForModal(error);
        this.modalService.error(title, message).subscribe();

        this.isSubmitting = false;
      }
    });
  }

  // Verifica token e define nova senha
  onSubmitVerify() {
    if (this.verifyForm.invalid) {
      this.verifyForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const { token, newPassword } = this.verifyForm.value;

    this.authService.verifyResetPassword(token, newPassword).subscribe({
      next: (response) => {
        console.log('Senha redefinida com sucesso:', response);
        this.modalService.success(
          'Senha redefinida',
          'Sua senha foi alterada com sucesso! Faça login com a nova senha.'
        ).subscribe(() => {
          this.navigateToLogin();
        });
      },
      error: (error) => {
        console.error('Erro ao redefinir senha:', error);

        // Extrai erros específicos de campos
        const fieldErrors = extractFieldErrors(error);

        // Aplica erros aos campos correspondentes
        Object.keys(fieldErrors).forEach(field => {
          const control = this.verifyForm.get(field);
          if (control) {
            control.setErrors({ backend: fieldErrors[field] });
            control.markAsTouched();
          }
        });

        // Formata e exibe modal de erro
        const { title, message } = formatErrorForModal(error);
        this.modalService.error(title, 'Token inválido').subscribe();

        this.isSubmitting = false;
      }
    });
  }
}
