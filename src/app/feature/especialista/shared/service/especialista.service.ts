import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Especialista } from '../model/especialista';

@Injectable({
    providedIn: 'root'
  })
  export class EspecialistaService {

    constructor(protected http: HttpService) {}

    public listar() {
        return this.http.doGet<Especialista[]>(`${environment.endpoint}/especialistas`, this.http.optsName('listar especialista'));
      }

  }

