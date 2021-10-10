import { Component, OnInit } from '@angular/core';
import { ProjetoService } from '../projeto.service';

export interface Projeto {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
  cidade: string;
  uf: string;
  valor: number;
  dias: number;
  data_inicial: Date;
  data_final: Date;
  agencia: string;
  conta: string;
  usuario: string
}

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.css'],
})
export class ProjetosComponent implements OnInit {

  dataSource: Projeto[] = [];

  constructor(private service: ProjetoService) {}

  ngOnInit() {
    this.service
      .getProjetos()
      .subscribe(projeto => {
        console.log(projeto);
        this.dataSource = projeto});
  }
}
