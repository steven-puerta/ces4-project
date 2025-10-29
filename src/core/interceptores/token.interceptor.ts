import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { AutorizacionService } from "../servicios/autorizacion.service";
import { Router } from "@angular/router";
import { RUTA_DEFAULT } from "../../app/app.routes";
import { Injectable } from "@angular/core";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private autorizacionServicio: AutorizacionService,
        private ruteador:Router
    ) {
        //
    }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.autorizacionServicio.obtenerToken();
        let autorizacionSolicitud = req;
        if (token) {
            autorizacionSolicitud = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(autorizacionSolicitud).pipe(
            catchError((error:HttpErrorResponse) => {
                if (error.status === 401 || error.status === 403) {
                    this.autorizacionServicio.cerrarSesion();
                    this.ruteador.navigate([RUTA_DEFAULT]);
                }
                return throwError(() => error);
            })
        );

    }

}