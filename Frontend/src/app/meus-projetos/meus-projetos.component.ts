import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Globals } from '../globals/globals';
import { ProjetoService } from '../projeto.service';
import { MatFormFieldModule } from '@angular/material/form-field';


export class Projeto {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
  cidade: string;
  uf: string;
  valor: number;
  dias: number;
  data_inicial: any;
  data_final: any;
  agencia: string;
  conta: string;
  usuario: string;
}

@Component({
  selector: 'app-meus-projetos',
  templateUrl: './meus-projetos.component.html',
  styleUrls: ['./meus-projetos.component.css'],
})
export class MeusProjetosComponent implements OnInit {
  dataSource: Projeto[] = [];

  constructor(
    private service: ProjetoService,
    private globals: Globals,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.service
      .getMeusProjetos(this.globals.loginData.usuario.usuario)
      .subscribe((projeto) => {
        this.dataSource = projeto;
      });
  }

  openEditDialog(projeto: Projeto):void {
    const dialogRef = this.dialog.open(MngProjetoDialog, {
      width: "900px",
      data: projeto
    });

    dialogRef.afterClosed().subscribe((projeto: Projeto) => {

      let projeto_hidratado = Object.assign({}, projeto);
      let data_inicial = projeto.data_inicial.slice(0,10);
      let data_final = projeto.data_inicial.slice(0,10);


      projeto_hidratado = {
        ...projeto,
        data_inicial: data_inicial,
        data_final: data_final,
        usuario: this.globals.loginData.usuario.usuario,
      }

      this.service.editProjeto(projeto_hidratado).subscribe( _ => {
        this.dataSource = this.dataSource.map( oldProject => {
          if (oldProject.id == projeto.id) return projeto;
          else return oldProject;
        })
      })
    })
  }

  remover(projeto: Projeto): void {
    console.log(projeto);
    this.service.removerProjeto(projeto.id).subscribe((_) => {
      this.dataSource = this.dataSource.filter(
        (projetos) => projetos.id != projeto.id
      );
    });
  }
}

@Component({
  selector: 'dialog-mng-projeto',
  templateUrl: 'dialog-mng-projeto.html',
})

export class MngProjetoDialog {

  constructor(public dialogRef: MatDialogRef<MngProjetoDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Projeto){}

  ngOnInit(){
    console.log(this.data);
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

}
