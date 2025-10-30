export interface Calendario {
    id: number;
    fecha: string;
    tipo: {
        id: number;
        tipo: string;
    };
    descripcion: string;
    pais: {
        id: number;
        nombre: string;
    }; 
}