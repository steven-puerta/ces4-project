import { Component, Inject } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TipoFestivo } from '../../../shared/modulos/entidades/tipo-festivo';

export interface DatosEdicionTipoFestivo {
  encabezado: string;
  tipoFestivo: TipoFestivo
}

@Component({
  selector: 'app-tipo-festivo-editar',
  imports: [
    ReferenciasMaterialModule,
    FormsModule
  ],
  templateUrl: './tipo-festivo-editar.component.html',
  styleUrl: './tipo-festivo-editar.component.css',
})
export class TipoFestivoEditarComponent {

  constructor (@Inject(MAT_DIALOG_DATA) public datos: DatosEdicionTipoFestivo) {
    //
  }

}
