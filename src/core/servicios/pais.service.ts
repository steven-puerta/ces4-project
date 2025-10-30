import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Pais } from '../../shared/modulos/entidades/pais';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlBase}paises/`;
  }

  public listar (): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${this.url}listar`);
  }

  public buscar (dato: string): Observable<Pais[]> {
    return this.http.get<Pais[]>(`${this.url}buscar/${dato}`);
  }
  
}
