import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/components/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CadastroComponent } from './features/cadastro/components/cadastro/cadastro.component';
import { EsquecerSenhaComponent } from './features/esqueci-senha/components/esquecer-senha/esquecer-senha.component';
import { AuthShellComponent } from './features/auth-shell/components/auth-shell/auth-shell.component';
import { DashboardShellComponent } from './features/dashboard/components/dashboard-shell/dashboard-shell.component';
import { DashboardHomeComponent } from './features/dashboard/components/dashboard-home/dashboard-home.component';
import { EditUserComponent } from './features/usuarios/components/edit-user/edit-user.component';

export const routes: Routes = [
    // Rotas protegidas (Dashboard)
    {
        path: 'dashboard',
        component: DashboardShellComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardHomeComponent },
            { path: 'perfil/:id', component: EditUserComponent },
            { path: 'eventos', component: DashboardHomeComponent }, // Placeholder
            { path: 'participantes', component: DashboardHomeComponent } // Placeholder
        ]
    },
    // Rotas de autenticação
    {
        path: '',
        component: AuthShellComponent,
        children: [
            { path: '', redirectTo: '/login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent, data: { animation: 'LoginPage' } },
            { path: 'cadastro', component: CadastroComponent, data: { animation: 'CadastroPage' } },
            { path: 'esquecer-senha', component: EsquecerSenhaComponent, data: { animation: 'EsquecerPage' } },
        ]
    },
    // Redirect para dashboard se rota não encontrada
    { path: '**', redirectTo: '/dashboard' }
];

