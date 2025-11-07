import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { TipoFestivo } from '../../../shared/modulos/entidades/tipo-festivo';
import { TipoFestivoService } from '../../../core/servicios/tipo-festivo.service';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoFestivoEditarComponent } from '../tipo-festivo-editar/tipo-festivo-editar.component';
import { DecidirComponent } from '../../../shared/components/decidir/decidir.component';

@Component({
  selector: 'app-tipo-festivo',
  imports: [
    ReferenciasMaterialModule,
    NgxDatatableModule,
    FormsModule
  ],
  templateUrl: './tipo-festivo.component.html',
  styleUrl: './tipo-festivo.component.css',
})
export class TipoFestivoComponent {

  public tiposFestivo: TipoFestivo[] = [];
  public columnas = [
    {
      name: 'Id',
      prop: 'id'
    },
    {
      name: 'Tipo',
      prop: 'tipo'
    }
  ]

  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  public tipoFestivoEscogido: TipoFestivo | undefined;
  public indiceTipoFestivoEscogido : number = -1;

  public textoBusqueda = '';

  constructor(private tipoFestivoServicio: TipoFestivoService,
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
      this.tipoFestivoEscogido = event.row;
      this.indiceTipoFestivoEscogido = this.tiposFestivo.findIndex((seleccion) => seleccion === this.tipoFestivoEscogido);
    }
  }

  listar() {
    this.tipoFestivoServicio.listar().subscribe({
      next: (response) => {
        this.tiposFestivo = response;
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
      this.tipoFestivoServicio.buscar(this.textoBusqueda).subscribe({
        next: (response) => {
          this.tiposFestivo = response;
        },
        error: (error) => {
          window.alert(error.message);
        }
      });
    }
  }

  agregar() {
    const cuadroDialogo = this.dialogoServicio.open(TipoFestivoEditarComponent, {
      width: "500",
      height: "300",
      data: {
        encabezado: 'Agregando un nuevo tipo de festivo',
        tipoFestivo: {
          id: 0,
          tipo: ''
        }
      },
      disableClose: true
    });

    cuadroDialogo.afterClosed().subscribe({
      next: (datos) => {
        if (datos) {
          this.tipoFestivoServicio.agregar(datos.tipoFestivo).subscribe({
            next: (response) => {
              this.tipoFestivoServicio.buscar(response.tipo).subscribe({
                next: (response) => {
                  this.tiposFestivo = response;
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
    if (this.tipoFestivoEscogido) {
      const cuadroDialogo = this.dialogoServicio.open(TipoFestivoEditarComponent, {
        width: "500",
        height: "300",
        data: {
          encabezado: `Modificando el Tipo de Festivo [${this.tipoFestivoEscogido?.tipo}]`,
          tipoFestivo: this.tipoFestivoEscogido
        },
        disableClose: true
      });

      cuadroDialogo.afterClosed().subscribe({
        next: (datos) => {
          if (datos) {
            this.tipoFestivoServicio.modificar(datos.tipoFestivo).subscribe({
              next: (response) => {
                this.tiposFestivo[this.indiceTipoFestivoEscogido] = response;
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
      window.alert('Debe escoger el Tipo de Festivo a modificar')
    }
  }

  eliminar() {

    if (this.tipoFestivoEscogido) {
      const cuadroDialogo = this.dialogoServicio.open(DecidirComponent, {
        width: "500px",
        height: "300px",
        data: {
          encabezado: `¿Está seguro que desea eliminar el Tipo de Festivo [${this.tipoFestivoEscogido?.tipo}]?`,
          id: this.tipoFestivoEscogido.id
        },
        disableClose: true
      });

      cuadroDialogo.afterClosed().subscribe({
        next: (datos) => {
          if (datos) {
            this.tipoFestivoServicio.eliminar(datos.id).subscribe({
              next: (response) => {
                if (response) {
                  this.tiposFestivo.splice(this.indiceTipoFestivoEscogido, 1);
                  window.alert(`El Tipo de Festivo [${this.tipoFestivoEscogido?.tipo}] ha sido eliminado`);
                } else {
                  window.alert('No se pudo eliminar el Tipo de Festivo');
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
      window.alert('Debe escoger el Tipo de Festivo a eliminar');
    }
  }

  navegarAtras() {
    this.router.navigate(['/landing']);
  }

}
