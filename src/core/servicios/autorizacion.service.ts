import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutorizacionService {

  private readonly TOKEN_KEY = 'token';

  constructor() { }

  guardarToken(token: string) {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  obtenerToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  cerrarSesion():void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

}
