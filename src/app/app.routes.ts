import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/components/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CadastroComponent } from './features/cadastro/components/cadastro/cadastro.component';
import { EsquecerSenhaComponent } from './features/esqueci-senha/components/esquecer-senha/esquecer-senha.component';
import { AuthShellComponent } from './features/auth-shell/components/auth-shell/auth-shell.component';

export const routes: Routes = [
    // {
    //     path: '',
    //     component: ,
    //     canActivate: [AuthGuard]
    // },
    {
        path: '',
        component: AuthShellComponent,
        children: [
            { path: 'login', component: LoginComponent, data: { animation: 'LoginPage' } },
            { path: 'cadastro', component: CadastroComponent, data: { animation: 'CadastroPage' } },
            { path: 'esquecer-senha', component: EsquecerSenhaComponent, data: { animation: 'EsquecerPage' } },
        ]
    }


];

