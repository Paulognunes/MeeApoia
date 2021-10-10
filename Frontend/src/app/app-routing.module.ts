import { ProjetosComponent } from './projetos/projetos.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { RegistarUserComponent } from './registar-user/registar-user.component';
import { HomeComponent } from './home/home.component';
import { MeusProjetosComponent } from './meus-projetos/meus-projetos.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registrar-user', component: RegistarUserComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent },
  { path: 'projetos', component: ProjetosComponent },
  {
    path: 'meus-projetos',
    component: MeusProjetosComponent,
    canActivate: [AuthGuard],
  },
  { path: 'cadastro', component: CadastroComponent, canActivate: [AuthGuard] },
  {
    path: 'meus-projetos',
    component: MeusProjetosComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
