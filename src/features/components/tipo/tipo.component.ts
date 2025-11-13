import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { Tipo } from '../../../shared/modulos/entidades/tipo';
import { TipoService } from '../../../core/servicios/tipo.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TipoEditarComponent } from '../tipo-editar/tipo-editar.component';
import { DecidirComponent } from '../../../shared/components/decidir/decidir.component';

@Component({
  selector: 'app-tipo',
  imports: [
    ReferenciasMaterialModule,
    NgxDatatableModule,
    FormsModule
  ],
  templateUrl: './tipo.component.html',
  styleUrl: './tipo.component.css',
})
export class TipoComponent {

  public tipos: Tipo[] = [];
  public columnas = [
    {
      name: 'Id',
      prop: 'id'
    },
    {
      name: 'Tipo',
      prop: 'tipo'
    },
  ]

  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  public tipoEscogido: Tipo | undefined;
  public indiceTipoEscogido : number = -1;

  public textoBusqueda = '';

  constructor(private tipoServicio: TipoService,
    private dialogoServicio: MatDialog,
    private router: Router
  ) {
    //
  }

  ngOnInit(): void {
    this.listar();
  }

  escoger(event: any) {
    if (event.type === 'click') {
      this.tipoEscogido = event.row;
      this.indiceTipoEscogido = this.tipos.findIndex((seleccion) => seleccion === this.tipoEscogido);
    }
  }

  listar() {
    this.tipoServicio.listar().subscribe({
      next: (response) => {
        this.tipos = response;
      },
      error: (error) => {
        window.alert(error.message);
      }
    });
  }

  buscar() {
    if (this.textoBusqueda.length === 0) {
      this.listar();
    } else {
      this.tipoServicio.buscar(this.textoBusqueda).subscribe({
        next: (response) => {
          this.tipos = response;
        },
        error: (error) => {
          window.alert(error.message);
        }
      });
    }
  }

  agregar() {
    const cuadroDialogo = this.dialogoServicio.open(TipoEditarComponent, {
      width: "500",
      height: "300",
      data: {
        encabezado: 'Agregando un nuevo tipo',
        tipo: {
          id: 0,
          tipo: ''
        }
      },
      disableClose: true
    });

    cuadroDialogo.afterClosed().subscribe({
      next: (datos) => {
        if (datos) {
          this.tipoServicio.agregar(datos.tipo).subscribe({
            next: (response) => {
              this.tipoServicio.buscar(response.tipo).subscribe({
                next: (response) => {
                  this.tipos = response;
                },
                error: (error) => {
                  window.alert(error.message);
                }
              });
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

  modificar() {
    if (this.tipoEscogido) {
      const cuadroDialogo = this.dialogoServicio.open(TipoEditarComponent, {
        width: "500",
        height: "300",
        data: {
          encabezado: `Modificando el Tipo [${this.tipoEscogido?.tipo}]`,
          tipo: this.tipoEscogido
        },
        disableClose: true
      });

      cuadroDialogo.afterClosed().subscribe({
        next: (datos) => {
          if (datos) {
            this.tipoServicio.modificar(datos.tipo).subscribe({
              next: (response) => {
                this.tipos[this.indiceTipoEscogido] = response;
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
      
    } else {
      window.alert('Debe escoger el Tipo a modificar')
    }
  }

  eliminar() {
  
    if (this.tipoEscogido) {
      const cuadroDialogo = this.dialogoServicio.open(DecidirComponent, {
        width: "500px",
        height: "300px",
        data: {
          encabezado: `¿Está seguro que desea eliminar el Tipo [${this.tipoEscogido?.tipo}]?`,
          id: this.tipoEscogido.id
        },
        disableClose: true
      });

      cuadroDialogo.afterClosed().subscribe({
        next: (datos) => {
          if (datos) {
            this.tipoServicio.eliminar(datos.id).subscribe({
              next: (response) => {
                if (response) {
                  this.tipos.splice(this.indiceTipoEscogido, 1);
                  window.alert(`El Tipo [${this.tipoEscogido?.tipo}] ha sido eliminado`);
                } else {
                  window.alert('No se pudo eliminar el Tipo seleccionado');
                }
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

    } else {
      window.alert('Debe escoger el Tipo a eliminar');
    }
  }

  navegarAtras() {
    this.router.navigate(['/landing']);
  }

}
