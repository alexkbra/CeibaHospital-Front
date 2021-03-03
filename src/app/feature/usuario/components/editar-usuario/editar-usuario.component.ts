import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '@usuario/shared/model/usuario';
import { UsuarioService } from '@usuario/shared/service/usuario.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-editar-usuario',
    templateUrl: './editar-usuario.component.html',
    styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

    usuarioCrearForm: FormGroup;
    usuarioSelecionado: Usuario;

    constructor(protected usuarioService: UsuarioService) {

    }

    ngOnInit(): void {
        this.usuarioSelecionado = this.usuarioService.usuarioSeleccionado;
        this.construirFormularioCrearUsuario();
    }

    actualizar() {
        if( this.usuarioCrearForm.valid){
            this.ejecutarActualizar();
        }
    }

    private ejecutarActualizar() {
        Swal.fire({
            title: '¿Desea actualizar el usuario?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: `Si`,
            denyButtonText: `No`,
        }).then((result) => {
            if (result.isConfirmed) {
                this.usuarioSelecionado.estrato = this.usuarioCrearForm.value['estrato'];
                this.usuarioService.actualizar(this.usuarioSelecionado).subscribe(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Usuario actualizado'
                    });
                }, (error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'error',
                        text: error.error.mensaje
                    });
                });
            }
        });
    }

    private construirFormularioCrearUsuario() {
        this.usuarioCrearForm = new FormGroup({
            estrato: new FormControl(this.usuarioSelecionado.estrato, [Validators.required])
        });
    }

}
