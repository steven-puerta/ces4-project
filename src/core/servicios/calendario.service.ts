import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Calendario } from '../../shared/modulos/entidades/calendario';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlBase}calendario/`;
  }

  public listar (): Observable<Calendario[]> {
    return this.http.get<Calendario[]>(`${this.url}listar/1/2025`);
  }

  public buscar (dato: string): Observable<Calendario[]> {
    return this.http.get<Calendario[]>(`${this.url}buscar/${dato}`);
  }
  
}
