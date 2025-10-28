import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ReferenciasMaterialModule } from '../shared/modulos/referencias-material.module';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from '../shared/modulos/entidades/usuario';
import { NgIf } from '@angular/common';
import { UsuarioService } from '../core/servicios/usuario.service';
import { AutorizacionService } from '../core/servicios/autorizacion.service';
import { LoginComponent } from '../features/components/login/login.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ReferenciasMaterialModule,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

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

}
