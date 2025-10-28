import { Usuario } from "../modulos/entidades/usuario";

export interface UsuarioLoginDto {
    usuario: Usuario,
    token: string
}