import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Usuario } from "@usuario/shared/model/usuario";
import { UsuarioService } from "@usuario/shared/service/usuario.service";
import Swal from 'sweetalert2';

@Component({
    selector: 'app-listar-usuario',
    templateUrl: './listar-usuario.component.html',
    styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent implements OnInit {

    listarUsuario: Usuario[];
    

    constructor(protected usuarioService: UsuarioService, private router: Router) {

    }

    ngOnInit(): void {
        this.ejecutarListarUsuario();
    }



    private ejecutarListarUsuario() {
        this.usuarioService.listar().subscribe((listaUsuario) => {
            this.listarUsuario = listaUsuario;
        }, (error) => {
            console.log(error);
        });
    }

    eliminar(id: number) {
        Swal.fire({
            title: '¿Desea eliminar usuario?',
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

    editar(usuarioSeleccionada: Usuario) {
        this.usuarioService.usuarioSeleccionado = usuarioSeleccionada;
        this.router.navigateByUrl('/usuario/editar');
    }


    private ejecutarEliminacion(id: number) {
        this.usuarioService.eliminar(id).subscribe(() => {
            Swal.fire({
                icon: 'success',
                title: 'Usuairo eliminado '
            });
            this.ejecutarListarUsuario();
        }, (error) => {
            Swal.fire({
                icon: 'error',
                title: 'error',
                text: error
            });
        });
    }
}