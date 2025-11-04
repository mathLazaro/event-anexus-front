# Event-Anexus

Sistema de gerenciamento de eventos desenvolvido com Angular 19, oferecendo uma interface moderna e responsiva para gestão completa de eventos corporativos.

[![Angular](https://img.shields.io/badge/Angular-19.1.7-DD0031?logo=angular)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.1-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Phosphor Icons](https://img.shields.io/badge/Phosphor-2.1.1-lightgreen)](https://phosphoricons.com)

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Executando o Projeto](#-executando-o-projeto)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Componentes Genéricos](#-componentes-genéricos)
- [Sistema de Validação](#-sistema-de-validação)
- [Tratamento de Erros](#-tratamento-de-erros)
- [Testes](#-testes)
- [Build](#-build)
- [Contribuindo](#-contribuindo)

---

## 🎯 Sobre o Projeto

Event-Anexus é uma plataforma moderna para gerenciamento de eventos corporativos, oferecendo funcionalidades completas de autenticação, cadastro de usuários, gestão de perfis e administração de eventos.

### Destaques

- ✨ Interface moderna e responsiva com Tailwind CSS
- 🔐 Sistema completo de autenticação e autorização
- 📱 Design mobile-first com componentes reutilizáveis
- 🎨 Biblioteca de ícones Phosphor Icons
- ⚡ Performance otimizada com Angular 19
- 🛡️ Validações robustas e tratamento de erros do backend
- 🔄 Máscaras de input automáticas (telefone, CPF, etc.)

---

## 🚀 Funcionalidades

### Autenticação
- [x] Login com validação de email e senha
- [x] Cadastro de novos usuários
- [x] Recuperação de senha via email
- [x] Guards de proteção de rotas
- [x] Interceptors HTTP para tokens JWT

### Gestão de Usuários
- [x] Perfil de usuário com edição
- [x] Alteração de senha
- [x] Validação de telefone com máscara automática
- [x] Upload de foto de perfil
- [x] Exclusão de conta

### Componentes Reutilizáveis
- [x] Input genérico com validação integrada
- [x] Button com estados de loading
- [x] Modal service para dialogs
- [x] Sidebar responsiva
- [x] Header com navegação

---

## 🛠️ Tecnologias

### Core
- **Angular 19.1.7** - Framework principal
- **TypeScript 5.7** - Linguagem de programação
- **RxJS 7.8** - Programação reativa
- **Angular Router** - Gerenciamento de rotas
- **Angular Forms** - Formulários reativos

### UI/UX
- **Tailwind CSS 3.4.1** - Framework CSS utility-first
- **Phosphor Icons 2.1.1** - Biblioteca de ícones
- **SCSS** - Pré-processador CSS

### Desenvolvimento
- **Angular CLI 19.1.7** - Ferramentas de desenvolvimento
- **ESBuild** - Bundler ultrarrápido
- **PostCSS** - Processamento de CSS
- **Karma + Jasmine** - Testes unitários

---

## 🏗️ Arquitetura

O projeto segue a arquitetura modular do Angular com separação clara de responsabilidades:

```
src/app/
├── core/                    # Módulo principal (singleton)
│   ├── dto/                # Data Transfer Objects
│   ├── guards/             # Route Guards
│   ├── interceptors/       # HTTP Interceptors
│   ├── services/           # Serviços globais
│   ├── header/             # Componente de cabeçalho
│   └── footer/             # Componente de rodapé
│
├── features/               # Módulos de funcionalidades
│   ├── auth-shell/        # Shell de autenticação
│   ├── login/             # Módulo de login
│   ├── cadastro/          # Módulo de cadastro
│   ├── esqueci-senha/     # Módulo de recuperação
│   └── usuarios/          # Módulo de usuários
│
└── shared/                 # Recursos compartilhados
    ├── components/        # Componentes reutilizáveis
    │   ├── input/        # Input genérico
    │   ├── button/       # Button genérico
    │   ├── modal/        # Modal service
    │   └── sidebar/      # Sidebar navegação
    ├── directives/       # Diretivas customizadas
    ├── pipes/            # Pipes customizados
    ├── utils/            # Utilitários
    └── services/         # Serviços compartilhados
```

### Princípios Arquiteturais

- **Standalone Components**: Todos os componentes são standalone (Angular 19+)
- **Lazy Loading**: Módulos carregados sob demanda
- **Reactive Forms**: Formulários reativos com validação robusta
- **Service Layer**: Lógica de negócio centralizada em services
- **Component Reusability**: Componentes genéricos e reutilizáveis
- **Type Safety**: Tipagem forte com TypeScript e DTOs

---

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** >= 18.19.0 ou >= 20.11.0 ou >= 22.0.0
- **npm** >= 10.0.0
- **Angular CLI** >= 19.1.7

### Verificar versões instaladas

```bash
node --version
npm --version
ng version
```

### Instalar Angular CLI globalmente (se necessário)

```bash
npm install -g @angular/cli@19.1.7
```

---

## ⚙️ Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/MatheusAnthonyPereiraAbreu/Event-Anexus.git
cd Event-Anexus
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `src/environments/environment.development.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://127.0.0.1:5000'
};
```

Para produção, crie `src/environments/environment.ts`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://sua-api-producao.com'
};
```

---

## 🚀 Executando o Projeto

### Servidor de Desenvolvimento

```bash
npm start
```

Ou usando o Angular CLI diretamente:

```bash
ng serve
```

A aplicação estará disponível em `http://localhost:4200/`

**Recursos do servidor de desenvolvimento:**
- ♻️ Hot reload automático
- 🔍 Source maps para debugging
- ⚡ Compilação incremental rápida
- 📊 Relatórios de build no terminal

### Servidor com porta customizada

```bash
ng serve --port 4300
```

### Servidor acessível na rede local

```bash
ng serve --host 0.0.0.0
```

---

## 📁 Estrutura do Projeto

### Diretório Core (`src/app/core/`)

Contém serviços singleton, guards, interceptors e componentes globais:

```typescript
// Exemplo: AuthService
@Injectable({ providedIn: 'root' })
export class AuthService {
  login(credentials: LoginDto): Observable<LoginResponse> { }
  register(user: UserDto): Observable<UserResponse> { }
  logout(): void { }
}
```

### Diretório Features (`src/app/features/`)

Módulos de funcionalidades específicas, cada um com sua estrutura:

```
feature-name/
├── components/          # Componentes da feature
├── services/           # Serviços específicos
└── models/            # Modelos/Interfaces locais
```

### Diretório Shared (`src/app/shared/`)

Recursos compartilhados entre módulos:

```typescript
// Exemplo: Componente Input Genérico
@Component({
  selector: 'app-input',
  standalone: true,
  template: `...`
})
export class InputComponent implements OnInit { }
```

---

## 🎨 Componentes Genéricos

### InputComponent

Input reutilizável com validação integrada e suporte a máscaras.

#### Uso Básico

```html
<app-input
  [control]="form.controls['email']"
  label="E-mail"
  type="email"
  placeholder="seu@email.com"
  icon="envelope"
/>
```

#### Com Máscara de Telefone

```html
<app-input
  [control]="form.controls['telephone']"
  label="Telefone"
  type="tel"
  mask="phone"
  icon="phone"
/>
```

#### Propriedades

| Propriedade | Tipo | Descrição |
|------------|------|-----------|
| `control` | `AbstractControl` | FormControl do Angular |
| `label` | `string` | Label do input |
| `type` | `'text' \| 'email' \| 'password' \| 'tel'` | Tipo do input |
| `placeholder` | `string` | Placeholder |
| `icon` | `string` | Nome do ícone Phosphor |
| `mask` | `'phone' \| 'none'` | Máscara automática |
| `parentForm` | `FormGroup` | Form pai (para validações cross-field) |

### ButtonComponent

Button reutilizável com estados de loading e variantes de estilo.

#### Uso Básico

```html
<app-button
  type="submit"
  buttonType="primary"
  [disabled]="form.invalid"
  [loading]="isSubmitting"
>
  Entrar
</app-button>
```

#### Com Ícone

```html
<app-button
  buttonType="secondary"
  icon="user-plus"
  iconPosition="left"
  (click)="navigateToCadastro()"
>
  Criar conta
</app-button>
```

#### Propriedades

| Propriedade | Tipo | Descrição |
|------------|------|-----------|
| `type` | `'button' \| 'submit'` | Tipo do botão |
| `buttonType` | `'primary' \| 'secondary' \| 'outline' \| 'danger'` | Variante visual |
| `disabled` | `boolean` | Estado desabilitado |
| `loading` | `boolean` | Mostra spinner de loading |
| `icon` | `string` | Nome do ícone Phosphor |
| `iconPosition` | `'left' \| 'right'` | Posição do ícone |
| `fullWidth` | `boolean` | Largura total |

---

## ✅ Sistema de Validação

### PhonePipe

Pipe para formatação e validação de telefones brasileiros.

```typescript
// Uso em template
{{ phoneNumber | phone }}
// Resultado: (11) 98765-4321

{{ phoneNumber | phone:'INTERNATIONAL' }}
// Resultado: +55 (11) 98765-4321

// Uso em código
import { PhonePipe } from '@shared/pipes/phone.pipe';

const formatted = PhonePipe.format('11987654321');
const isValid = PhonePipe.isValid('11987654321');
const pattern = PhonePipe.getValidationPattern();
```

#### Métodos Estáticos

- `format(value: string, format?)`: Formata número
- `unformat(value: string)`: Remove formatação
- `isValid(value: string)`: Valida número brasileiro
- `getValidationPattern()`: Retorna RegExp para validação

### PhoneMaskDirective

Diretiva para máscara automática de telefone.

```html
<input
  type="tel"
  formControlName="telephone"
  appPhoneMask
/>
```

### Validadores Customizados

```typescript
// Password match validator
function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  
  if (password?.value !== confirmPassword?.value) {
    return { passwordsMismatch: true };
  }
  return null;
}

// Uso no FormBuilder
this.form = this.fb.group({
  password: ['', [Validators.required, Validators.minLength(6)]],
  confirmPassword: ['', Validators.required]
}, { validators: passwordMatchValidator });
```

---

## 🛡️ Tratamento de Erros

### Error Handler Utility

Sistema centralizado para tratamento de erros do backend.

#### Formato de Erro do Backend

```json
{
  "error": "Bad request",
  "details": [
    { "email": "Valor duplicado" },
    { "password": "Senha muito fraca" }
  ]
}
```

#### Funções Disponíveis

```typescript
import {
  extractErrorMessage,
  extractFieldErrors,
  formatErrorForModal,
  isDuplicateFieldError,
  translateFieldName
} from '@shared/utils/error-handler';

// Extrair mensagem formatada
const message = extractErrorMessage(error);
// Resultado: "E-mail: Valor duplicado\nSenha: Senha muito fraca"

// Extrair erros por campo
const fieldErrors = extractFieldErrors(error);
// Resultado: { email: "Valor duplicado", password: "Senha muito fraca" }

// Formatar para modal
const { title, message } = formatErrorForModal(error);
// Resultado: { title: "Erro de Validação", message: "..." }

// Verificar erro de duplicação
if (isDuplicateFieldError(error, 'email')) {
  // Tratar erro de email duplicado
}
```

#### Uso em Componentes

```typescript
onSubmit() {
  this.authService.register(formData).subscribe({
    next: (response) => {
      // Sucesso
    },
    error: (error) => {
      // Extrai erros específicos de campos
      const fieldErrors = extractFieldErrors(error);
      
      // Aplica erros aos campos correspondentes
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
  });
}
```

#### Traduções de Campos

| Campo Backend | Tradução PT-BR |
|--------------|----------------|
| `email` | E-mail |
| `password` | Senha |
| `telephone_number` | Telefone |
| `name` | Nome |
| `department` | Departamento |
| `type` | Tipo |
| `current_password` | Senha atual |
| `new_password` | Nova senha |
| `confirm_password` | Confirmar senha |

---

## 🧪 Testes

### Executar Testes Unitários

```bash
npm test
```

Ou com cobertura:

```bash
ng test --code-coverage
```

### Executar Testes em CI

```bash
ng test --watch=false --browsers=ChromeHeadless
```

### Estrutura de Testes

```typescript
describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply phone mask when mask="phone"', () => {
    component.mask = 'phone';
    component.ngOnInit();
    // ... testes
  });
});
```

---

## 📦 Build

### Build de Desenvolvimento

```bash
npm run build
```

### Build de Produção

```bash
npm run build -- --configuration production
```

### Build com Análise de Bundle

```bash
npm run build -- --stats-json
npx webpack-bundle-analyzer dist/event-anexus/stats.json
```

### Configurações de Build

No `angular.json`:

```json
{
  "configurations": {
    "production": {
      "optimization": true,
      "outputHashing": "all",
      "sourceMap": false,
      "namedChunks": false,
      "extractLicenses": true,
      "budgets": [
        {
          "type": "initial",
          "maximumWarning": "500kB",
          "maximumError": "1MB"
        }
      ]
    }
  }
}
```

---

## 🎨 Personalização

### Tailwind CSS

Customize o tema no arquivo `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#2C2C54',
        secondary: '#474787',
        grayCool: '#C8CDDB',
        grayLight: '#E9ECF4',
        // Adicione suas cores
      }
    }
  }
}
```

### Phosphor Icons

Ícones disponíveis em: https://phosphoricons.com

```html
<!-- Uso em templates -->
<i class="ph-bold ph-user"></i>

<!-- Uso no ButtonComponent -->
<app-button icon="user" />
```

---

## 📚 Documentação Adicional

- [Angular Documentation](https://angular.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Phosphor Icons](https://phosphoricons.com)
- [RxJS Documentation](https://rxjs.dev)

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Convenções de Código

- Siga o [Angular Style Guide](https://angular.dev/style-guide)
- Use TypeScript strict mode
- Escreva testes para novas funcionalidades
- Documente componentes e serviços públicos
- Use Conventional Commits


---

## 👥 Autores

- **Matheus Anthony Pereira Abreu** - [GitHub](https://github.com/MatheusAnthonyPereiraAbreu)

---

