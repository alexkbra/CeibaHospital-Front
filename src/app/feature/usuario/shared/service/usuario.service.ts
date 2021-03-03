import { Injectable } from '@angular/core';
import { HttpService } from "@core/services/http.service";
import { environment } from 'src/environments/environment';
import { Usuario } from "../model/usuario";


@Injectable({
   providedIn: 'root'
})
export class UsuarioService {

    usuarioSeleccionado : Usuario;

    constructor(protected http: HttpService) {}

    public buscar(numeroDocumento: string, tipoDocumento: string) {
        return this.http.doGet<Usuario>(`${environment.endpoint}/usuarios/${numeroDocumento}/${tipoDocumento}`, this.http.optsName('buscar usuario'));
    }

    public crear(usuario: Usuario){
        return this.http.doPost<Usuario, any>(`${environment.endpoint}/usuarios`,usuario, this.http.optsName('crear usuario'));
    }

    public actualizar(usuario: Usuario) {
        return this.http.doPut<Usuario, any>(`${environment.endpoint}/usuarios/${usuario.id}`, usuario, this.http.optsName('actualizar usuario'));
      }

    public listar(){
         return this.http.doGet<Usuario[]>(`${environment.endpoint}/usuarios`, this.http.optsName('listar usuario'));
    }

    public eliminar(id:number){
        return this.http.doDelete(`${environment.endpoint}/usuarios/${id.toString()}`, this.http.optsName('eliminar usuario'));
      }


}