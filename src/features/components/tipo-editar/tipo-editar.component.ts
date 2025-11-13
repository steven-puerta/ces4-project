import { Component, Inject } from '@angular/core';
import { Tipo } from '../../../shared/modulos/entidades/tipo';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DatosEdicionTipo {
  encabezado: string;
  tipo: Tipo
}

@Component({
  selector: 'app-tipo-editar',
  imports: [
    ReferenciasMaterialModule,
    FormsModule
  ],
  templateUrl: './tipo-editar.component.html',
  styleUrl: './tipo-editar.component.css',
})
export class TipoEditarComponent {

  constructor (@Inject(MAT_DIALOG_DATA) public datos: DatosEdicionTipo) {
    //
  }

}
