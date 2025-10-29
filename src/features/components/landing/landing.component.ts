import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [
    ReferenciasMaterialModule
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {

  constructor (private router: Router) {}

  navegarTipoFestivo() {
    this.router.navigate(['/tipo-festivo']);
  }

  navegarFestivo() {
    this.router.navigate(['/festivo']);
  }

  navegarPais() {
    this.router.navigate(['/pais']);
  }

  navegarCalendario() {
    this.router.navigate(['/calendario']);
  }

  navegarTipo() {
    this.router.navigate(['/tipo']);
  }

  navegarAutores() {
    this.router.navigate(['/autores']);
  }

}
