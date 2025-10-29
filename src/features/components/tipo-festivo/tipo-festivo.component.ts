import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { TipoFestivo } from '../../../shared/modulos/entidades/tipo-festivo';
import { TipoFestivoService } from '../../../core/servicios/tipo-festivo.service';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  navegarAtras() {
    this.router.navigate(['/landing']);
  }

}
