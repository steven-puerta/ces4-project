import { Routes } from '@angular/router';
import { InicioComponent } from '../features/components/inicio/inicio.component';
import { LandingComponent } from '../features/components/landing/landing.component';
import { AutoresComponent } from '../features/components/autores/autores.component';
import { TipoFestivoComponent } from '../features/components/tipo-festivo/tipo-festivo.component';
import { FestivoComponent } from '../features/components/festivo/festivo.component';
import { PaisComponent } from '../features/components/pais/pais.component';
import { CalendarioComponent } from '../features/components/calendario/calendario.component';
import { TipoComponent } from '../features/components/tipo/tipo.component';
import { VerificarFestivoComponent } from '../features/components/verificar-festivo/verificar-festivo.component';

export const RUTA_DEFAULT = '/inicio'; 

export const routes: Routes = [
    { path: "", redirectTo: "inicio", pathMatch: "full" },
    { path: "inicio", component: InicioComponent },
    { path: "landing", component: LandingComponent },
    { path: "autores", component: AutoresComponent },
    { path: "tipo-festivo", component: TipoFestivoComponent },
    { path: "festivo", component: FestivoComponent },
    { path: "pais", component: PaisComponent },
    { path: "calendario", component: CalendarioComponent },
    { path: "tipo", component: TipoComponent },
    { path: "verificar", component: VerificarFestivoComponent },

];
