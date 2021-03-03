import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
  export class MensajeService {

    constructor(protected http: HttpService) {}

    public enviar(mensaje: string){
        return this.http.doGet<any>(`${environment.endpoint}/mensajes/${mensaje}`, this.http.optsName('enviar mensaje'));
    }

  }