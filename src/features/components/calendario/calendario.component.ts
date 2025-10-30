import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { Calendario } from '../../../shared/modulos/entidades/calendario';
import { CalendarioService } from '../../../core/servicios/calendario.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendario',
  imports: [
    ReferenciasMaterialModule,
    NgxDatatableModule,
    FormsModule
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

  public textoBusqueda = '';

  constructor(private calendarioServicio: CalendarioService,
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
      this.calendarioEscogido = event.row;
      this.indiceCalendarioEscogido = this.calendarios.findIndex((seleccion) => seleccion === this.calendarioEscogido);
    }
  }

  listar() {
    this.calendarioServicio.listar().subscribe({
      next: (response) => {
        this.calendarios = response;
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
      this.calendarioServicio.buscar(this.textoBusqueda).subscribe({
        next: (response) => {
          this.calendarios = response;
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
