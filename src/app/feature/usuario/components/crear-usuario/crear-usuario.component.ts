import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '@usuario/shared/model/usuario';
import { UsuarioService } from '@usuario/shared/service/usuario.service';
import Swal from 'sweetalert2';

const LONGITUD_MAXIMA_PERMITIDA_DOCUMENTO = 15
@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  usuarioCrearForm: FormGroup;

  constructor(protected usuarioService: UsuarioService) {

  }

  ngOnInit(): void {
    this.construirFormularioCrearUsuario();
  }

  crear() {
    if(this.usuarioCrearForm.valid){
    this.ejecutarCrearUsuario();
    }
  }

  private ejecutarCrearUsuario() {
    Swal.fire({
      title: '¿Desea crear el usuario?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        let usuario = new Usuario();
        usuario.numeroDocumento = this.usuarioCrearForm.value['numeroDocumento'];
        usuario.tipoDocumento = this.usuarioCrearForm.value['tipoDocumento'];
        usuario.estrato = this.usuarioCrearForm.value['estrato'];
        this.usuarioService.crear(usuario).subscribe((respuesta) => {
          Swal.fire({
            icon: 'success',
            title: 'Usuario creado con id ' + respuesta.valor
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
        numeroDocumento: new FormControl('', [Validators.required, Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_DOCUMENTO)]),
        tipoDocumento: new FormControl('', [Validators.required]),
        estrato:  new FormControl('', [Validators.required])
    });
  }

}
