import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UsuarioLoginDto } from '../../shared/DTOs/usuario-login.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlBase}usuarios/`;
  }

  public login (usuario: string, clave: string): Observable<UsuarioLoginDto> {
    return this.http.get<UsuarioLoginDto>(`${this.url}validar/${usuario}/${clave}`);
  }
  
}
