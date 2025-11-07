import { Pais } from "./pais";
import { Tipo } from "./tipo";

export interface Calendario {
    id: number;
    fecha: string;
    tipo: Tipo;
    descripcion: string;
    pais: Pais;
}