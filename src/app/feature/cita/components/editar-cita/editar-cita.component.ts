import { Component, OnInit } from "@angular/core";
import { CitaService } from "@cita/shared/service/cita.service";
import { Especialista } from "@especialista/shared/model/especialista";
import Swal from 'sweetalert2';

@Component({
    selector: 'app-editar-cita',
    templateUrl: './editar-cita.component.html',
    styleUrls: ['./editar-cita.component.css']
})
export class EditarCitaComponent implements OnInit {

    today: number = Date.now();
    especialistaSeleccionada: Especialista;
    fechaCita: string;
    tiempoCita: string;

    constructor(protected citaService: CitaService) {

    }

    ngOnInit(): void {
        this.especialistaSeleccionada = this.citaService.citaSeleccionado.especialista;
        this.fechaCita = this.citaService.citaSeleccionado.fechaCita.split(" ", 2)[0];
        this.tiempoCita = (this.citaService.citaSeleccionado.fechaCita.split(" ", 2)[1]).substr(0, 5);
    }

    actualizar(): void {
        this.citaService.citaSeleccionado.especialistaId = this.especialistaSeleccionada.id.toString();
        this.citaService.citaSeleccionado.usuarioId = this.citaService.citaSeleccionado.usuario.id.toString();
        this.citaService.citaSeleccionado.fechaCita = `${this.fechaCita} ${this.tiempoCita}:00`;
        this.validarDisponibilidadCita();

    }

    private ejecutarActualizarCita() {
        this.citaService.actualizar(this.citaService.citaSeleccionado).subscribe(() => {
            Swal.fire({
                icon: 'success',
                title: 'Cita actualizada '
            });
        }, (error) => {
            Swal.fire({
                icon: 'error',
                title: 'error',
                text: error.error.mensaje
            });
        });
    }

    private validarDisponibilidadCita() {
        this.citaService.disponibilidad(this.citaService.citaSeleccionado).subscribe((respuestaDisponible) => {
            Swal.fire({
                title: `${respuestaDisponible.valor['mensaje']} ${respuestaDisponible.valor['fechaCita']}.\n -> Desea actualizar la cita?`,
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: `Si`,
                denyButtonText: `No`,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.citaService.citaSeleccionado.fechaCita = respuestaDisponible.valor['fechaCita'];
                    this.ejecutarActualizarCita();
                }
            });
        }, (error) => {
            Swal.fire({
                icon: 'error',
                title: 'error',
                text: error.error.mensaje
            });
        });
    }


}