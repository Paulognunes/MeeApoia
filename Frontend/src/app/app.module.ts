import { Globals } from './globals/globals';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID } from '@angular/core';

import { ProjetosComponent } from './projetos/projetos.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { RegistarUserComponent } from './registar-user/registar-user.component';
import { HomeComponent } from './home/home.component';
import { MeusProjetosComponent, MngProjetoDialog } from './meus-projetos/meus-projetos.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { registerLocaleData } from '@angular/common';
import  localePt  from '@angular/common/locales/pt';
import { MatDialogModule } from '@angular/material/dialog';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    ProjetosComponent,
    CadastroComponent,
    RegistarUserComponent,
    HomeComponent,
    MeusProjetosComponent,
    AuthComponent,
    MngProjetoDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
  ],
  entryComponents:[
    MngProjetoDialog
  ],
  providers: [AuthGuard, Globals,
    { provide: LOCALE_ID, useValue: 'pt-br' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
