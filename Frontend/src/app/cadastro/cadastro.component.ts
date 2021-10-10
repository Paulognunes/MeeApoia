import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Globals } from '../globals/globals';
import { ProjetoService } from '../projeto.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  projeto: FormGroup;

  constructor(
    private projetoService: ProjetoService,
    private router: Router,
    private globals: Globals,
    private formBuilder: FormBuilder
  ) {
    this.projeto = this.formBuilder.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      categoria: ['', Validators.required],
      cidade: ['', Validators.required],
      valor: ['', Validators.required],
      uf: ['', Validators.required],
      dias: ['', Validators.required],
      agencia: ['', Validators.required],
      conta: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  cadastrar() {
    let projeto_hidratado = Object.assign({}, this.projeto.value);

    let data_inicial = new Date();
    let data_final = new Date();

    data_final.setDate(
      data_final.getDate() +
        Number.parseInt(this.projeto.controls['dias'].value)
    );

    projeto_hidratado = {
      data_inicial: data_inicial.toISOString().split('T')[0],
      data_final: data_final.toISOString().split('T')[0],
      usuario: this.globals.loginData.usuario.usuario,
      ...projeto_hidratado,
    };

    console.log(typeof(projeto_hidratado.data_final));
    console.log(projeto_hidratado.data_final);
    if (this.projeto.valid) {
      this.projetoService.setProjeto(projeto_hidratado).subscribe((response) => {
        console.log(response);
        this.projeto.reset();
        this.router.navigate(['/projetos']);
      });
    }
  }
}
