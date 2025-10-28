import { Routes } from '@angular/router';
import { InicioComponent } from '../features/components/inicio/inicio.component';
import { LandingComponent } from '../features/components/landing/landing.component';
import { AutoresComponent } from '../features/components/autores/autores.component';

export const RUTA_DEFAULT = '/inicio'; 

export const routes: Routes = [
    { path: "", redirectTo: "inicio", pathMatch: "full" },
    { path: "inicio", component: InicioComponent },
    { path: "landing", component: LandingComponent },
    { path: "autores", component: AutoresComponent },
];
