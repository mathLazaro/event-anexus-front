# Esqueci Senha (Password Reset)

Componente responsável pelo fluxo completo de recuperação de senha em duas etapas.

## 📋 Fluxo de Funcionamento

### Etapa 1: Solicitar Reset de Senha
1. Usuário informa seu e-mail
2. Sistema envia POST para `/auth/reset-password` com `{ email: string }`
3. Backend envia e-mail com link contendo token
4. Modal de sucesso informa ao usuário para verificar o e-mail

### Etapa 2: Redefinir Senha
1. Usuário clica no link recebido por e-mail (com token na query string)
2. Página é recarregada com `?token=xyz` na URL
3. Componente detecta o token e exibe formulário de redefinição
4. Usuário define nova senha e confirmação
5. Sistema envia POST para `/auth/verify-reset-password` com:
   ```json
   {
     "token": "string",
     "new_password": "string"
   }
   ```
6. Modal de sucesso e redirecionamento para login

## 🔧 Uso

### Acessar página de reset
```typescript
this.router.navigate(['/esquecer-senha']);
```

### Link de reset no e-mail
O backend deve gerar um link no formato:
```
https://seudominio.com/esquecer-senha?token=TOKEN_GERADO
```

## 📝 Estrutura de Componente

### Propriedades

- `resetForm: FormGroup` - Formulário da etapa 1 (solicitar reset)
- `verifyForm: FormGroup` - Formulário da etapa 2 (redefinir senha)
- `isSubmitting: boolean` - Estado de carregamento
- `isVerifyStep: boolean` - Indica qual etapa está ativa
- `token: string | null` - Token de verificação da URL

### Métodos

#### `onSubmitReset()`
Envia solicitação de reset de senha para o e-mail informado.

```typescript
onSubmitReset() {
  this.authService.requestPasswordReset(email).subscribe({
    next: (response) => {
      // Exibe modal de sucesso
      // Usuário aguarda e-mail
    },
    error: (error) => {
      // Trata erros do backend
      // Aplica erros aos campos
    }
  });
}
```

#### `onSubmitVerify()`
Verifica o token e define a nova senha.

```typescript
onSubmitVerify() {
  this.authService.verifyResetPassword(token, newPassword).subscribe({
    next: (response) => {
      // Senha redefinida com sucesso
      // Redireciona para login
    },
    error: (error) => {
      // Token inválido ou expirado
      // Trata erros do backend
    }
  });
}
```

## 🎨 Template

### Etapa 1: Solicitar Reset
```html
<div *ngIf="!isVerifyStep">
  <form [formGroup]="resetForm" (ngSubmit)="onSubmitReset()">
    <app-input 
      label="E-mail" 
      type="email"
      icon="envelope"
      [control]="resetForm.get('email')!"
    />
    <app-button type="submit" buttonType="primary">
      Enviar link de recuperação
    </app-button>
  </form>
</div>
```

### Etapa 2: Redefinir Senha
```html
<div *ngIf="isVerifyStep">
  <form [formGroup]="verifyForm" (ngSubmit)="onSubmitVerify()">
    <app-input 
      label="Token de verificação"
      [control]="verifyForm.get('token')!"
    />
    <app-input 
      label="Nova senha"
      type="password"
      [control]="verifyForm.get('newPassword')!"
    />
    <app-input 
      label="Confirmar senha"
      type="password"
      [control]="verifyForm.get('confirmPassword')!"
      [parentForm]="verifyForm"
    />
    <app-button type="submit" buttonType="primary">
      Redefinir senha
    </app-button>
  </form>
</div>
```

## 🛡️ Validações

### Formulário de Reset (Etapa 1)
- **email**: Required, Email format

### Formulário de Verificação (Etapa 2)
- **token**: Required
- **newPassword**: Required, Min 6 caracteres
- **confirmPassword**: Required, Must match newPassword

### Validador Customizado
```typescript
passwordMatchValidator(group: FormGroup): { [key: string]: boolean } | null {
  const newPassword = group.get('newPassword')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;

  if (newPassword && confirmPassword && newPassword !== confirmPassword) {
    return { passwordsMismatch: true };
  }
  return null;
}
```

## 🔐 Segurança

### Boas Práticas Implementadas
- ✅ Token único por solicitação
- ✅ Validação de senha (mínimo 6 caracteres)
- ✅ Confirmação de senha obrigatória
- ✅ Feedback claro ao usuário
- ✅ Tratamento de erros do backend
- ✅ Redirecionamento após sucesso

### Recomendações para Backend
- Token deve expirar em 1 hora
- Token deve ser usado apenas uma vez
- Validar força da senha
- Rate limiting em ambos endpoints
- Não revelar se o e-mail existe no sistema

## 📋 Tratamento de Erros

O componente usa o sistema centralizado de tratamento de erros:

```typescript
import { 
  extractFieldErrors, 
  formatErrorForModal 
} from '@shared/utils/error-handler';

// No error callback
error: (error) => {
  // Extrai erros por campo
  const fieldErrors = extractFieldErrors(error);
  
  // Aplica aos campos do formulário
  Object.keys(fieldErrors).forEach(field => {
    const control = this.form.get(field);
    if (control) {
      control.setErrors({ backend: fieldErrors[field] });
      control.markAsTouched();
    }
  });

  // Exibe modal formatado
  const { title, message } = formatErrorForModal(error);
  this.modalService.error(title, message).subscribe();
}
```

## 🔄 Fluxo de Navegação

```
/login
  ↓ (clica "Esqueceu senha?")
/esquecer-senha
  ↓ (informa e-mail)
[Envia solicitação]
  ↓ (usuário recebe e-mail)
[Clica no link com token]
  ↓
/esquecer-senha?token=xyz
  ↓ (define nova senha)
[Senha redefinida]
  ↓
/login (com modal de sucesso)
```

## 🧪 Testando

### Teste Manual - Etapa 1
1. Acesse `/esquecer-senha`
2. Digite um e-mail válido
3. Clique em "Enviar link de recuperação"
4. Verifique se modal de sucesso aparece
5. Verifique console para logs

### Teste Manual - Etapa 2
1. Acesse `/esquecer-senha?token=teste123`
2. Verifique se formulário de redefinição aparece
3. Digite senha e confirmação diferentes
4. Verifique mensagem de erro
5. Digite senhas iguais e submeta
6. Verifique redirecionamento para login

## 📚 Dependências

- `AuthService` - Métodos `requestPasswordReset()` e `verifyResetPassword()`
- `ModalService` - Exibição de feedback ao usuário
- `InputComponent` - Campos de formulário
- `ButtonComponent` - Botões de ação
- `error-handler` - Tratamento centralizado de erros

## 🔗 Endpoints da API

### POST `/auth/reset-password`
Solicita reset de senha.

**Request:**
```json
{
  "email": "usuario@exemplo.com"
}
```

**Response (200):**
```json
{
  "message": "E-mail de recuperação enviado com sucesso"
}
```

**Errors:**
- 400: E-mail inválido
- 404: E-mail não encontrado
- 429: Muitas tentativas

### POST `/auth/verify-reset-password`
Verifica token e redefine senha.

**Request:**
```json
{
  "token": "abc123xyz",
  "new_password": "NovaSenha123"
}
```

**Response (200):**
```json
{
  "message": "Senha redefinida com sucesso"
}
```

**Errors:**
- 400: Token inválido ou senha fraca
- 401: Token expirado
- 404: Token não encontrado

## 📝 Notas

- O token na URL é automaticamente detectado via `ActivatedRoute`
- O usuário pode voltar para etapa 1 clicando em "Solicitar novo link"
- Todos os erros são traduzidos para português
- Estados de loading são exibidos durante as requisições
