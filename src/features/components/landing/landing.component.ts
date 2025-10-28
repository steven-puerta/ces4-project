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

  navegarAutores() {
    this.router.navigate(['/autores']);
  }

}
