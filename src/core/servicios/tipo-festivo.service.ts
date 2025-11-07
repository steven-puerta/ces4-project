import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { TipoFestivo } from '../../shared/modulos/entidades/tipo-festivo';

@Injectable({
  providedIn: 'root'
})
export class TipoFestivoService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = `${environment.urlBase}tiposfestivos/`;
  }

  public listar (): Observable<TipoFestivo[]> {
    return this.http.get<TipoFestivo[]>(`${this.url}listar`);
  }

  public buscar (dato: string): Observable<TipoFestivo[]> {
    return this.http.get<TipoFestivo[]>(`${this.url}buscar/${dato}`);
  }

  public agregar (tipoFestivo: TipoFestivo): Observable<TipoFestivo> {
    return this.http.post<TipoFestivo>(`${this.url}agregar`, tipoFestivo);
  }

  public modificar (tipoFestivo: TipoFestivo): Observable<TipoFestivo> {
    return this.http.put<TipoFestivo>(`${this.url}modificar`, tipoFestivo);
  }

  public eliminar (id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}eliminar/${id}`);
  }
  
}
