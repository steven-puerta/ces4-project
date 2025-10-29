import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { Festivo } from '../../../shared/modulos/entidades/festivo';
import { FestivoService } from '../../../core/servicios/festivo.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

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

  navegarAtras() {
    this.router.navigate(['/landing']);
  }


}
