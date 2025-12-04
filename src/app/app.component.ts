import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { ReferenciasMaterialModule } from '../shared/modulos/referencias-material.module';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../shared/modulos/entidades/usuario';
import { NgFor, NgIf } from '@angular/common';
import { UsuarioService } from '../core/servicios/usuario.service';
import { AutorizacionService } from '../core/servicios/autorizacion.service';
import { LoginComponent } from '../features/components/login/login.component';
import { RUTA_DEFAULT } from './app.routes';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ReferenciasMaterialModule,
    NgIf,
    NgFor,
    RouterModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  public opciones = [
    { titulo: "Tipo de Festivo", ruta: "tipo-festivo" },
    { titulo: "Festivo", ruta: "festivo" },
    { titulo: "País", ruta: "pais" },
    { titulo: "Calendario", ruta: "calendario" },
    { titulo: "Tipo", ruta: "tipo" },
    { titulo: "Verificar", ruta: "verificar" },
  ];

  public usuarioActual:Usuario | null = null;

  constructor(private dialogoServicio: MatDialog,
    private usuarioServicio: UsuarioService,
    private autorizacionServicio: AutorizacionService,
    private router: Router
  ) {
    //
  }

  login() {
    const cuadroDialogo = this.dialogoServicio.open(LoginComponent, {
      width: "500px",
      height: "300",
      data: {
        usuario: '',
        clave: ''
      }
    });

    cuadroDialogo.afterClosed().subscribe({
      next: (datos) => {
        if (datos) {
          this.usuarioServicio.login(datos.usuario, datos.clave).subscribe({
            next: (response) => {
              console.log(response)
              this.autorizacionServicio.guardarToken(response.token);
              this.usuarioActual = response.usuario;
              this.router.navigate(['/landing']);
              //window.alert(response.token);
            },
            error: (error) => {
              window.alert(error.message);
            }
          });
        }
      },
      error: (error) => {
        window.alert(error);
      }
    });
  }

  logout() {
    this.autorizacionServicio.cerrarSesion();
    this.router.navigate([RUTA_DEFAULT]);
    window.location.reload();
  }

}
