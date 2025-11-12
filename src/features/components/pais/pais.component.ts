import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { Pais } from '../../../shared/modulos/entidades/pais';
import { PaisService } from '../../../core/servicios/pais.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PaisEditarComponent } from '../pais-editar/pais-editar.component';
import { DecidirComponent } from '../../../shared/components/decidir/decidir.component';

@Component({
  selector: 'app-pais',
  imports: [
    ReferenciasMaterialModule,
    NgxDatatableModule,
    FormsModule
  ],
  templateUrl: './pais.component.html',
  styleUrl: './pais.component.css',
})
export class PaisComponent {

  public paises: Pais[] = [];
  public columnas = [
    {
      name: 'Id',
      prop: 'id'
    },
    {
      name: 'Nombre',
      prop: 'nombre'
    },
  ]

  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  public paisEscogido: Pais | undefined;
  public indicePaisEscogido : number = -1;

  public textoBusqueda = '';

  constructor(private paisServicio: PaisService,
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
      this.paisEscogido = event.row;
      this.indicePaisEscogido = this.paises.findIndex((seleccion) => seleccion === this.paisEscogido);
    }
  }

  listar() {
    this.paisServicio.listar().subscribe({
      next: (response) => {
        this.paises = response;
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
      this.paisServicio.buscar(this.textoBusqueda).subscribe({
        next: (response) => {
          this.paises = response;
        },
        error: (error) => {
          window.alert(error.message);
        }
      });
    }
  }

  agregar() {
      const cuadroDialogo = this.dialogoServicio.open(PaisEditarComponent, {
        width: "500",
        height: "300",
        data: {
          encabezado: 'Agregando un nuevo país',
          pais: {
            id: 0,
            nombre: ''
          }
        },
        disableClose: true
      });
  
      cuadroDialogo.afterClosed().subscribe({
        next: (datos) => {
          if (datos) {
            this.paisServicio.agregar(datos.pais).subscribe({
              next: (response) => {
                this.paisServicio.buscar(response.nombre).subscribe({
                  next: (response) => {
                    this.paises = response;
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
      if (this.paisEscogido) {
        const cuadroDialogo = this.dialogoServicio.open(PaisEditarComponent, {
          width: "500",
          height: "300",
          data: {
            encabezado: `Modificando el país [${this.paisEscogido?.nombre}]`,
            pais: this.paisEscogido
          },
          disableClose: true
        });
  
        cuadroDialogo.afterClosed().subscribe({
          next: (datos) => {
            if (datos) {
              this.paisServicio.modificar(datos.pais).subscribe({
                next: (response) => {
                  this.paises[this.indicePaisEscogido] = response;
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
        window.alert('Debe escoger el país a modificar')
      }
    }
  
    eliminar() {
  
      if (this.paisEscogido) {
        const cuadroDialogo = this.dialogoServicio.open(DecidirComponent, {
          width: "500px",
          height: "300px",
          data: {
            encabezado: `¿Está seguro que desea eliminar el país [${this.paisEscogido?.nombre}]?`,
            id: this.paisEscogido.id
          },
          disableClose: true
        });
  
        cuadroDialogo.afterClosed().subscribe({
          next: (datos) => {
            if (datos) {
              this.paisServicio.eliminar(datos.id).subscribe({
                next: (response) => {
                  if (response) {
                    this.paises.splice(this.indicePaisEscogido, 1);
                    window.alert(`El país [${this.paisEscogido?.nombre}] ha sido eliminado`);
                  } else {
                    window.alert('No se pudo eliminar el país');
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
