import { Component, Inject } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pais } from '../../../shared/modulos/entidades/pais';


export interface DatosEdicionPais {
  encabezado: string;
  pais: Pais
}

@Component({
  selector: 'app-pais-editar',
  imports: [
    ReferenciasMaterialModule,
    FormsModule
  ],
  templateUrl: './pais-editar.component.html',
  styleUrl: './pais-editar.component.css',
})
export class PaisEditarComponent {

    constructor (@Inject(MAT_DIALOG_DATA) public datos: DatosEdicionPais) {
      //
    }

}
