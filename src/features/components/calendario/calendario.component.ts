import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { Calendario } from '../../../shared/modulos/entidades/calendario';
import { CalendarioService } from '../../../core/servicios/calendario.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PaisService } from '../../../core/servicios/pais.service';
import { Pais } from '../../../shared/modulos/entidades/pais';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-calendario',
  imports: [
    ReferenciasMaterialModule,
    NgxDatatableModule,
    FormsModule,
    NgFor
  ],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css',
})
export class CalendarioComponent {

  public calendarios: Calendario[] = [];
  public columnas = [
    {
      name: 'Fecha',
      prop: 'fecha'
    },
    {
      name: 'Tipo',
      prop: 'tipo.tipo'
    },
    {
      name: 'Descripción',
      prop: 'descripcion'
    },
    {
      name: 'País',
      prop: 'pais.nombre'
    },
    
  ]

  public modoColumna = ColumnMode;
  public tipoSeleccion = SelectionType;

  public calendarioEscogido: Calendario | undefined;
  public indiceCalendarioEscogido : number = -1;

  public paises : Pais[] = [];

  public textoBusqueda = '';

  public paisElegido : Pais | undefined ;
  public anioElegido : number = new Date().getFullYear();

  constructor(private calendarioServicio: CalendarioService,
    private paisServicio: PaisService,
    private router: Router
  ) {
    //
  }

  ngOnInit(): void {
    this.listarPaises()
  }

  escoger(event: any) {
    if (event.type === 'click') {
      this.calendarioEscogido = event.row;
      this.indiceCalendarioEscogido = this.calendarios.findIndex((seleccion) => seleccion === this.calendarioEscogido);
    }
  }

  listarPaises() {
    this.paisServicio.listar().subscribe({
      next: (response) => {
        this.paises = response;
        console.log('paises', this.paises);
      },
      error: (error) => {
        window.alert(error.message);
      }
    });
  }

  public compararPaises( pais1: Pais, pais2: Pais): boolean {
    return pais1 && pais2 ? pais1.id === pais2.id : pais1 === pais2;
  }

  generar() {
    this.calendarioServicio.generar(this.paisElegido?.id.toString(), this.anioElegido.toString()).subscribe({
      next: (response) => {
        console.log('Calendario generado', response);
        this.calendarioServicio.listar(this.paisElegido?.id.toString(), this.anioElegido.toString()).subscribe({
          next: (subResponse) => {
            this.calendarios = subResponse;
          },
          error: (error) => {
            window.alert(error.message);
          }
        })
      },
      error: (error) => {
        window.alert(error.message);
      }
    });
  }

  navegarAtras() {
    this.router.navigate(['/landing']);
  }

}
