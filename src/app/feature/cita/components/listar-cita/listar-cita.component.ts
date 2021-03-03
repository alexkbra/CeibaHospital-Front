import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Cita } from "@cita/shared/model/cita";
import { CitaService } from "@cita/shared/service/cita.service";
import Swal from 'sweetalert2';

@Component({
    selector: 'app-listar-cita',
    templateUrl: './listar-cita.component.html',
    styleUrls: ['./listar-cita.component.css']
})
export class ListarCitaComponent implements OnInit {

    listarCitaUsurio: Cita[];

    constructor(protected citaService: CitaService, private router: Router) {

    }

    ngOnInit(): void {
        this.listarCitas();
    }



    private listarCitas() {
        this.citaService.listar(this.citaService.usuarioSeleccionado.numeroDocumento, this.citaService.usuarioSeleccionado.tipoDocumento).subscribe((listaCitas) => {
            this.listarCitaUsurio = listaCitas;
        }, (error) => {
            console.log(error);
        });
    }

    eliminar(id: number) {
        Swal.fire({
            title: '¿Desea eliminar la cita?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Si`,
            denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                this.ejecutarEliminacion(id);
            }
        });
    }

    editar(citaSeleccionada: Cita) {
        this.citaService.citaSeleccionado = citaSeleccionada;
        this.router.navigateByUrl('/cita/editar');
    }


    private ejecutarEliminacion(id: number) {
        this.citaService.eliminar(id).subscribe(() => {
            Swal.fire({
                icon: 'success',
                title: 'Cita eliminada '
            });
            this.listarCitas();
        }, (error) => {
            Swal.fire({
                icon: 'error',
                title: 'error',
                text: error
            });
        });
    }
}