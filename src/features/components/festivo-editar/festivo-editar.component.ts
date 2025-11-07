import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Festivo } from '../../../shared/modulos/entidades/festivo';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { TipoFestivo } from '../../../shared/modulos/entidades/tipo-festivo';
import { Pais } from '../../../shared/modulos/entidades/pais';

export interface DatosEdicionFestivo {
  encabezado: string;
  festivo: Festivo;
  tiposFestivo: TipoFestivo[],
  paises: Pais[];
}

@Component({
  selector: 'app-festivo-editar',
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgFor
  ],
  templateUrl: './festivo-editar.component.html',
  styleUrl: './festivo-editar.component.css',
})
export class FestivoEditarComponent {

  constructor (@Inject(MAT_DIALOG_DATA) public datos: DatosEdicionFestivo) {
    //
  }

  public compararTiposFestivo( tipoFestivo1: TipoFestivo, tipoFestivo2: TipoFestivo): boolean {
    return tipoFestivo1 && tipoFestivo2 ? tipoFestivo1.id === tipoFestivo2.id : tipoFestivo1 === tipoFestivo2;
  }

  public compararPaises( pais1: Pais, pais2: Pais): boolean {
    return pais1 && pais2 ? pais1.id === pais2.id : pais1 === pais2;
  }

}
