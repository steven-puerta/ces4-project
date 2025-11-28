import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Festivo } from '../../shared/modulos/entidades/festivo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FestivoService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlBase}festivos/`;
  }

  public listar (): Observable<Festivo[]> {
    return this.http.get<Festivo[]>(`${this.url}listar`);
  }

  public buscar (dato: string): Observable<Festivo[]> {
    return this.http.get<Festivo[]>(`${this.url}buscar/${dato}`);
  }

  public agregar (festivo: Festivo): Observable<Festivo> {
    return this.http.post<Festivo>(`${this.url}agregar`, festivo);
  }

  public modificar (festivo: Festivo): Observable<Festivo> {
    return this.http.put<Festivo>(`${this.url}modificar`, festivo);
  }

  public eliminar (id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}eliminar/${id}`);
  }

  public verificar (pais: string = '1', anio: string, mes: string, dia: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.url}verificar/${pais}/${anio}/${mes}/${dia}`);
  }
  
}
