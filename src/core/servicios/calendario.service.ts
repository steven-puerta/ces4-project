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

  public generar (pais: string = '1', anio: string = '2025'): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}generar/${pais}/${anio}`);
  }

  public listar (): Observable<Calendario[]> {
    return this.http.get<Calendario[]>(`${this.url}listar/1/2025`);
  }
  
}
