import { Component, OnInit } from '@angular/core';
import { Especialista } from '@especialista/shared/model/especialista';
import { EspecialistaService } from '@especialista/shared/service/especialista.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-especialista',
  templateUrl: './especialista.component.html',
  styleUrls: ['./especialista.component.css']
})
export class EspecialistaComponent implements OnInit {

  listarEspecialsta: Especialista[];
  constructor(protected especialistaService:EspecialistaService) { }

  ngOnInit(): void {
    this.especialistaService.listar().subscribe((listaEspecialista)=>{
      this.listarEspecialsta = listaEspecialista;
    },(error)=>{
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: error
    });
    });
  }

}
