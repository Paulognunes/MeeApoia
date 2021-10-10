import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './auth/auth.component';
import { Globals } from './globals/globals';
import { Projeto } from './projetos/projetos.component';

@Injectable({
  providedIn: 'root',
})
export class ProjetoService {
  constructor(private http: HttpClient, private globals: Globals) {}

  getProjetos(): Observable<Projeto[]> {
    return this.http.get<Projeto[]>('http://localhost:3000/project');
  }


  getMeusProjetos(user: string): Observable<Projeto[]> {
    return this.http.get<Projeto[]>('http://localhost:3000/my-project/' + user, this.header());
  }

  setProjeto(projeto: Projeto): Observable<Projeto> {
    return this.http.post<Projeto>('http://localhost:3000/project', projeto, this.header());
  }

  setUser(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('http://localhost:3000/user', user);
  }

  editProjeto(projeto: Projeto): Observable<any> {
    return this.http.put('http://localhost:3000/project/' + projeto.id, projeto, this.header());
  }

  removerProjeto(id_projeto: number): Observable<any> {
    return this.http.delete('http://localhost:3000/project/' + id_projeto, this.header());
  }

  header() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.globals.loginData.token,
      })
    };
  }
}
