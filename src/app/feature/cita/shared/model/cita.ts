import { Especialista } from "src/app/feature/especialista/shared/model/especialista";
import { Usuario } from "src/app/feature/usuario/shared/model/usuario";

export class Cita{
    id: number;
    fechaCreacion: string;
    fechaCita: string;
    valor: number;
    usuario: Usuario;
    usuarioId: string;
    especialista: Especialista;
    especialistaId: string;
    horaCita: number;




}