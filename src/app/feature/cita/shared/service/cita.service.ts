import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { Usuario } from '@usuario/shared/model/usuario';
import { environment } from 'src/environments/environment';
import { Cita } from '../model/cita';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  citaActivo: Cita;
  public usuarioSeleccionado : Usuario = new Usuario();
  public citaSeleccionado : Cita = new Cita();

  constructor(protected http: HttpService) {}

  public crear(cita: Cita) {
    console.log("Servicio crear cita");
    return this.http.doPost<Cita, any>(`${environment.endpoint}/citas`, cita, this.http.optsName('crear cita'));
  }

  public listar(numeroDocumento: string, tipoDocumento: string){
    return this.http.doGet<Cita[]>(`${environment.endpoint}/citas/${numeroDocumento}/${tipoDocumento}`, this.http.optsName('listar cita'));
  }

  public eliminar(id:number){
    return this.http.doDelete(`${environment.endpoint}/citas/${id.toString()}`, this.http.optsName('eliminar cita'));
  }

  public disponibilidad(cita: Cita){
    return this.http.doPost<Cita, any>(`${environment.endpoint}/citas/disponibilidad`, cita, this.http.optsName('disponibildiad cita'));
  }

  public actualizar(cita: Cita) {
    console.log("Servicio crear cita");
    return this.http.doPut<Cita, any>(`${environment.endpoint}/citas/${cita.id}`, cita, this.http.optsName('actualizar cita'));
  }
  
}