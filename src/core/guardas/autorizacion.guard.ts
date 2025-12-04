import { CanActivate, Router } from "@angular/router";
import { RUTA_DEFAULT } from "../../app/app.routes";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AutorizacionGuard implements CanActivate{

  private readonly TOKEN_KEY = 'token';

  constructor (private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token && !this.tokenExpirado(token)) {
      return true;
    } else {
      this.router.navigate([RUTA_DEFAULT]);
      return false;
    }
  }

  private tokenExpirado (token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiracion = payload.exp;
      const ahora = Math.floor(Date.now() / 1000);
      return expiracion < ahora;
    } catch (error) {
      return true;
    }
  }
}