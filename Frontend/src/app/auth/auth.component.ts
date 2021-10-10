import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Globals } from '../globals/globals';

export class AuthResponse {
  token!: string;
  usuario!: {usuario: string, senha: string}
  success!: boolean;
}

export class Usuario {
  usuario!: string;
  senha!: string;

  constructor(usuario: string, senha: string) {
    this.usuario = usuario;
    this.senha = senha
  }
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  login: FormGroup;

  public authInvalido!: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private globals: Globals,
    private formBuilder: FormBuilder
  ) {
    this.login = this.formBuilder.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authInvalido = false;
  }

  auth() {
    this.authService
      .auth(
        this.login.controls['usuario'].value,
        this.login.controls['senha'].value
      )
      .subscribe(
        (response) => {
          console.log(response);
          if (response.success == true) {
            this.globals.loginData.token = response.token;
            this.globals.loginData.usuario = new Usuario(
              response.usuario.usuario, response.usuario.senha
            );
            this.authInvalido = false;
            this.router.navigate(['/home']);
          }
        },
        (err) => {
          this.authInvalido = true;
        }
      );
  }
}
