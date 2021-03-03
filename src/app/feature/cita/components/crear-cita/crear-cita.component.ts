import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Cita } from '@cita/shared/model/cita';
import { Especialista } from '@especialista/shared/model/especialista';
import { EspecialistaService } from '@especialista/shared/service/especialista.service';
import { CitaService } from '../../shared/service/cita.service';
import Swal from 'sweetalert2';

const DESCUENTO_ESTRATO_1 = 0.75;
const DESCUENTO_ESTRATO_2 = 0.6;

@Component({
  selector: 'app-crear-cita',
  templateUrl: './crear-cita.component.html',
  styleUrls: ['./crear-cita.component.css']
})
export class CrearCitaComponent implements OnInit {

  today: number = Date.now();
  citaReservarForm: FormGroup;
  listaEspecialista: Especialista[];
  selectEspecialista: Especialista;
  public filterDateFrom: Date;

  constructor(protected citaService: CitaService, protected especialistaService: EspecialistaService) {

  }

  ngOnInit(): void {
    this.construirFormularioCrearCita();
    this.listarEspecialistas();
  }

  reserva() {
    if(this.citaReservarForm.valid){
      let cita = this.empezarConstruirCita();
      this.validarDisponibilidadCita(cita);
    }
  }

  private empezarConstruirCita() {
    let cita = new Cita();
    this.selectEspecialista = this.listaEspecialista.find(especialista => especialista.id.toString() === this.citaReservarForm.value['especialista']);
    cita.fechaCita = `${this.citaReservarForm.value['fechaCita']} ${this.citaReservarForm.value['tiempofechaCita']}:00`;
    cita.especialistaId = this.selectEspecialista.id.toString();
    return cita;
  }

  private validarDisponibilidadCita(cita: Cita) {
    this.citaService.disponibilidad(cita).subscribe((respuestaDisponible) => {
      this.terminarConstruirCita(cita, respuestaDisponible);
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: error.error.mensaje
      });
      console.log(error);
    });
  }

  private terminarConstruirCita(cita: Cita, respuestaDisponible: any) {
    cita.usuarioId = this.citaService.usuarioSeleccionado.id.toString();
    cita.valor = this.selectEspecialista.valor;
    let valor = this.calcularValor();
    this.determinarSiSeCreaLaCita(valor, respuestaDisponible, cita);
  }

  private determinarSiSeCreaLaCita(valor: number, respuestaDisponible: any, cita: Cita) {
    Swal.fire({
      title: `-> El valor de la cita corresponde a ${valor}.\n-> ${respuestaDisponible.valor['mensaje']} ${respuestaDisponible.valor['fechaCita']}.\n -> Desea obtener la cita?`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        cita.fechaCita = respuestaDisponible.valor['fechaCita'];
        this.crearNuevaCita(cita);
      }
    });
  }

  private calcularValor() {
    return this.citaService.usuarioSeleccionado.estrato === "1" ? DESCUENTO_ESTRATO_1 * this.selectEspecialista.valor : DESCUENTO_ESTRATO_2 * this.selectEspecialista.valor;
  }

  private crearNuevaCita(cita: Cita) {
    this.citaService.crear(cita).subscribe((resp) => {
      Swal.fire({
        icon: 'success',
        title: 'Cita creada con número ' + resp.valor
      });
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: error.error.mensaje
      });
    });
  }

  private listarEspecialistas() {
    this.especialistaService.listar().subscribe((lista) => {
      this.listaEspecialista = lista;
    }, (error) => {
      Swal.fire({
        icon: 'error',
        title: 'error',
        text: error.error.mensaje
    });
    });
  }

  private construirFormularioCrearCita() {
    this.citaReservarForm = new FormGroup({
      fechaCita: new FormControl('', [Validators.required]),
      especialista: new FormControl('', [Validators.required]),
      tiempofechaCita: new FormControl('', [Validators.required]),
    });
  }

}
