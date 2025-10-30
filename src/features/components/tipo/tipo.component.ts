import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { ColumnMode, NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';
import { Tipo } from '../../../shared/modulos/entidades/tipo';
import { TipoService } from '../../../core/servicios/tipo.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

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

  navegarAtras() {
    this.router.navigate(['/landing']);
  }

}
