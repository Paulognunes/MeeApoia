import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Globals } from '../globals/globals';
import { ProjetoService } from '../projeto.service';



@Component({
  selector: 'app-registar-user',
  templateUrl: './registar-user.component.html',
  styleUrls: ['./registar-user.component.css'],
})
export class RegistarUserComponent implements OnInit {

  novo_user: FormGroup;

  constructor(
    private projetoService: ProjetoService,
    private router: Router,
    private globals: Globals,
    private formBuilder: FormBuilder
  ) {
    this.novo_user = this.formBuilder.group({
      usuario: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  registrar_usuario(){

    if (this.novo_user.valid) {
      this.projetoService.setUser(this.novo_user.value).subscribe((response) => {
        console.log(response);
        this.novo_user.reset();
        this.router.navigate(['/home']);
      }
      );
    }

  }
}
