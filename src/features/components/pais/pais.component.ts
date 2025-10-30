import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { Pais } from '../../../shared/modulos/entidades/pais';
import { PaisService } from '../../../core/servicios/pais.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

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

  navegarAtras() {
    this.router.navigate(['/landing']);
  }

}
