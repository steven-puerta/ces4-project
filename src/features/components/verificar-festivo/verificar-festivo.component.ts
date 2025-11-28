import { Component } from '@angular/core';
import { ReferenciasMaterialModule } from '../../../shared/modulos/referencias-material.module';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { PaisService } from '../../../core/servicios/pais.service';
import { Router } from '@angular/router';
import { Pais } from '../../../shared/modulos/entidades/pais';
import { FestivoService } from '../../../core/servicios/festivo.service';

@Component({
  selector: 'app-verificar-festivo',
  imports: [
    ReferenciasMaterialModule,
    FormsModule,
    NgFor
  ],
  templateUrl: './verificar-festivo.component.html',
  styleUrl: './verificar-festivo.component.css',
})
export class VerificarFestivoComponent {

  public paises : Pais[] = [];

  public paisElegido : Pais | undefined ;
  public anioElegido : number = new Date().getFullYear();
  public mesElegido : number = new Date().getMonth() + 1;
  public diaElegido : number = new Date().getDate();
  public resultado : string = 'Selecciona un país y una fecha...'

  constructor(private paisServicio: PaisService,
    private festivoServicio: FestivoService,
    private router: Router
  ) {
    //
  }

  ngOnInit(): void {
    this.listarPaises()
  }

  listarPaises() {
    this.paisServicio.listar().subscribe({
      next: (response) => {
        this.paises = response;
        console.log('paises', this.paises);
      },
      error: (error) => {
        window.alert(error.message);
      }
    });
  }

  public compararPaises( pais1: Pais, pais2: Pais): boolean {
    return pais1 && pais2 ? pais1.id === pais2.id : pais1 === pais2;
  }

  verificar() {
    this.festivoServicio.verificar(
      this.paisElegido?.id.toString(),
      this.anioElegido.toString(),
      this.mesElegido.toString(),
      this.diaElegido.toString()
    ).subscribe({
      next: (response) => {
        console.log('Respuesta', response);
        this.resultado = response ? 'Es festivo!' : 'No es festivo...';
      },
      error: (error) => {
        window.alert(error.message);
      }
    });
  }

  navegarAtras() {
    this.router.navigate(['/landing']);
  }

}
