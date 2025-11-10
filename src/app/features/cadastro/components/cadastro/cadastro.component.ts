import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserDto, UserType } from '../../../../core/dto/user.dto';
import { AuthService } from '../../../../core/services/auth.service';
import { ModalService } from '../../../../shared/services/modal.service';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { extractFieldErrors, formatErrorForModal, isDuplicateFieldError } from '../../../../shared/utils/error-handler';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, InputComponent, ButtonComponent]
})
export class CadastroComponent {
  cadastroForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  // Expõe o enum UserType para o template
  readonly UserType = UserType;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private modalService: ModalService
  ) {
    this.cadastroForm = this.fb.group({
      department: [''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      // Aceita telefone formatado: (00) 00000-0000 ou (00) 0000-0000
      telephone_number: ['', [Validators.required, Validators.pattern(/^\(\d{2}\)\s\d{4,5}-\d{4}$/)]],
      // type is used to determine user type (ORGANIZER or REGULAR)
      type: [UserType.REGULAR, Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  private passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password && confirm && password !== confirm ? { passwordsMismatch: true } : null;
  }

  // conveniência para usar em templates ou código de forma curta: f.name, f.email, etc.
  get f() {
    return this.cadastroForm.controls;
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    if (this.cadastroForm.invalid) {
      this.cadastroForm.markAllAsTouched();

      // Coleta todos os erros para exibir no modal
      const invalidFields: string[] = [];
      const fieldLabels: { [key: string]: string } = {
        name: 'Nome',
        email: 'E-mail',
        telephone_number: 'Telefone',
        password: 'Senha',
        confirmPassword: 'Confirmar senha',
        department: 'Departamento',
        type: 'Tipo de conta'
      };

      Object.keys(this.cadastroForm.controls).forEach(key => {
        const control = this.cadastroForm.get(key);
        if (control?.invalid && control.errors) {
          const fieldLabel = fieldLabels[key] || key;

          // Identifica o tipo de erro
          if (control.errors['required']) {
            invalidFields.push(`${fieldLabel}: campo obrigatório`);
          } else if (control.errors['email']) {
            invalidFields.push(`${fieldLabel}: formato de e-mail inválido`);
          } else if (control.errors['minlength']) {
            const minLength = control.errors['minlength'].requiredLength;
            invalidFields.push(`${fieldLabel}: mínimo de ${minLength} caracteres`);
          } else if (control.errors['pattern']) {
            invalidFields.push(`${fieldLabel}: formato inválido`);
          } else {
            invalidFields.push(`${fieldLabel}: valor inválido`);
          }
        }
      });

      // Verifica erros do form-level (como passwordsMismatch)
      if (this.cadastroForm.errors) {
        if (this.cadastroForm.errors['passwordsMismatch']) {
          invalidFields.push('As senhas não coincidem');
        }
      }

      // Exibe modal com os erros
      const errorMessage = invalidFields.length > 0
        ? invalidFields.join('\n')
        : 'Por favor, preencha todos os campos obrigatórios corretamente.';

      this.modalService.error(
        'Formulário incompleto',
        errorMessage
      ).subscribe();

      return;
    }

    const raw = this.cadastroForm.value;
    const payload: UserDto = {
      department: raw.department || undefined,
      email: raw.email,
      name: raw.name,
      password: raw.password,
      telephone_number: raw.telephone_number,
      type: raw.type
    };

    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.createUser(payload).subscribe({
      next: (response) => {
        console.log('Usuário criado com sucesso:', response);

        // Exibe modal de sucesso
        this.modalService.success(
          'Cadastro realizado!',
          'Sua conta foi criada com sucesso. Você será redirecionado para fazer login.'
        ).subscribe(() => {
          // Navega para login após fechar o modal
          this.router.navigate(['/login']);
        });
      },
      error: (error) => {
        console.error('Erro ao criar usuário:', error);

        // Extrai erros específicos de campos
        const fieldErrors = extractFieldErrors(error);

        // Verifica se é erro de email duplicado
        if (isDuplicateFieldError(error, 'email')) {
          // Marca o campo como inválido
          const emailControl = this.cadastroForm.get('email');
          if (emailControl) {
            emailControl.setErrors({ duplicate: true });
            emailControl.markAsTouched();
          }
        }

        // Aplica erros aos campos correspondentes
        Object.keys(fieldErrors).forEach(field => {
          const control = this.cadastroForm.get(field);
          if (control) {
            control.setErrors({ backend: fieldErrors[field] });
            control.markAsTouched();
          }
        });

        // Formata e exibe modal de erro
        const { title, message } = formatErrorForModal(error);
        this.modalService.error(title, message).subscribe();

        this.isSubmitting = false;
      },
      complete: () => {
        this.isSubmitting = false;
      }
    });
  }
}
