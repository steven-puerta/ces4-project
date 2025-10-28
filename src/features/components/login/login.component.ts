import { Component, Inject } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DatosLogin {
  usuario: String;
  clave: String;
}

@Component({
  selector: 'app-login',
  imports: [
    ReferenciasMaterialModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public datos: DatosLogin) {}
}
