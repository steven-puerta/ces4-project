import { Pais } from "./pais";
import { TipoFestivo } from "./tipo-festivo";

export interface Festivo {
    id: number;
    nombre: string;
    dia: number;
    mes: number;
    diasPascua: number;
    pais: Pais;
    tipo: TipoFestivo;
}