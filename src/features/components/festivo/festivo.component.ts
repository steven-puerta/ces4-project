import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { Festivo } from '../../../shared/modulos/entidades/festivo';
import { FestivoService } from '../../../core/servicios/festivo.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FestivoEditarComponent } from '../festivo-editar/festivo-editar.component';
import { Pais } from '../../../shared/modulos/entidades/pais';
import { TipoFestivo } from '../../../shared/modulos/entidades/tipo-festivo';
import { DecidirComponent } from '../../../shared/components/decidir/decidir.component';
import { PaisService } from '../../../core/servicios/pais.service';
import { TipoFestivoService } from '../../../core/servicios/tipo-festivo.service';

@Component({
  selector: 'app-festivo',
  imports: [
    ReferenciasMaterialModule,
    NgxDatatableModule,
    FormsModule
  ],
  templateUrl: './festivo.component.html',
  styleUrl: './festivo.component.css',
})
export class FestivoComponent {

  public festivos: Festivo[] = [];
  public paises: Pais[] = [];
  public tiposFestivo: TipoFestivo[] = [];
  public columnas = [
    {
      name: 'Nombre',
      prop: 'nombre'
    },
    {
      name: 'Día',
      prop: 'dia'
    },
    {
      name: 'Mes',
      prop: 'mes'
    },
    {
      name: 'Día de Pascua',
      prop: 'diasPascua'
    },
    {
      name: 'País',
      prop: 'pais.nombre'
    },
    {
      name: 'Tipo',
      prop: 'tipo.tipo'
    },
  ]

  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  public festivoEscogido: Festivo | undefined;
  public indiceFestivoEscogido : number = -1;

  public textoBusqueda = '';

  constructor(private festivoServicio: FestivoService,
    private paisServicio: PaisService,
    private tipoFestivoServicio: TipoFestivoService,
    private dialogoServicio: MatDialog,
    private router: Router
  ) {
    //
  }

  ngOnInit(): void {
    this.listar();
    this.listarPaises();
    this.listarTiposFestivo();
  }

  escoger(event: any) {
    if (event.type === 'click') {
      this.festivoEscogido = event.row;
      this.indiceFestivoEscogido = this.festivos.findIndex((seleccion) => seleccion === this.festivoEscogido);
    }
  }

  listar() {
    this.festivoServicio.listar().subscribe({
      next: (response) => {
        this.festivos = response;
      },
      error: (error) => {
        window.alert(error.message);
      }
    });
  }

  listarPaises() {
    this.paisServicio.listar().subscribe({
      next: (response) => {
        this.paises = response;
      },
      error: (error) => {
        window.alert(error.message);
      }
    });
  }

  listarTiposFestivo() {
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
      this.festivoServicio.buscar(this.textoBusqueda).subscribe({
        next: (response) => {
          this.festivos = response;
        },
        error: (error) => {
          window.alert(error.message);
        }
      });
    }
  }

  agregar() {
    const cuadroDialogo = this.dialogoServicio.open(FestivoEditarComponent, {
      width: "500",
      height: "300",
      data: {
        encabezado: 'Agregando un nuevo Festivo',
        festivo: {
          id: 0,
          nombre: '',
          día: 0,
          mes: 0,
          diasPascua: 0,
          pais: {
            id: 0,
            nombre: ''
          },
          tipo: {
            id: 0,
            tipo: ''
          }
        },
        paises: this.paises,
        tiposFestivo: this.tiposFestivo,
      },
      disableClose: true
    });

    cuadroDialogo.afterClosed().subscribe({
      next: (datos) => {
        if (datos) {
          this.festivoServicio.agregar(datos.festivo).subscribe({
            next: (response) => {
              this.festivoServicio.buscar(response.nombre).subscribe({
                next: (response) => {
                  this.festivos = response;
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
    if (this.festivoEscogido) {
      const cuadroDialogo = this.dialogoServicio.open(FestivoEditarComponent, {
        width: "500",
        height: "300",
        data: {
          encabezado: `Modificando el Festivo [${this.festivoEscogido?.nombre}]`,
          festivo: this.festivoEscogido,
          paises: this.paises,
          tiposFestivo: this.tiposFestivo,
        },
        disableClose: true
      });

      cuadroDialogo.afterClosed().subscribe({
        next: (datos) => {
          if (datos) {
            this.festivoServicio.modificar(datos.festivo).subscribe({
              next: (response) => {
                this.festivos[this.indiceFestivoEscogido] = response;
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
      window.alert('Debe escoger el festivo a modificar')
    }
  }

  eliminar() {

    if (this.festivoEscogido) {
      const cuadroDialogo = this.dialogoServicio.open(DecidirComponent, {
        width: "500px",
        height: "300px",
        data: {
          encabezado: `¿Está seguro que desea eliminar el festivo [${this.festivoEscogido?.nombre}]?`,
          id: this.festivoEscogido.id
        },
        disableClose: true
      });

      cuadroDialogo.afterClosed().subscribe({
        next: (datos) => {
          if (datos) {
            this.festivoServicio.eliminar(datos.id).subscribe({
              next: (response) => {
                if (response) {
                  this.festivos.splice(this.indiceFestivoEscogido, 1);
                  window.alert(`El festivo [${this.festivoEscogido?.nombre}] ha sido eliminado`);
                } else {
                  window.alert('No se pudo eliminar la festivo');
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
      window.alert('Debe escoger el festivo a eliminar');
    }
  }

  navegarAtras() {
    this.router.navigate(['/landing']);
  }


}
