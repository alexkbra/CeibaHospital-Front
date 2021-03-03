import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CitaService } from '@cita/shared/service/cita.service';
import { UsuarioService } from 'src/app/feature/usuario/shared/service/usuario.service';

const LONGITUD_MAXIMA_PERMITIDA_DOCUMENTO = 15
const ERROR_USUARIO_NO_EXISTE = 412;
@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.css']
})
export class CitaComponent implements OnInit {

  usuarioBuscarForm: FormGroup;

  visibleMenuCita: boolean = false;
  visibleMenuUsuario: boolean = false;

  constructor(protected citaService: CitaService, protected usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.construirFormularioBuscarUsuario();
  }

  buscarUsuario() {
    if (this.usuarioBuscarForm.valid) {
      this.usuarioService.buscar(this.usuarioBuscarForm.value['numeroDocumento'], this.usuarioBuscarForm.value['tipoDocumento']).subscribe((usuario) => {
        this.citaService.usuarioSeleccionado = usuario;
        console.log(usuario);
        this.visibleMenuCita = true;
        this.visibleMenuUsuario = false;
        this.usuarioBuscarForm.disable({
          onlySelf: false,
          emitEvent: false
        });
      }, (error) => {
        this.visibleMenuCita = false;
        if (error.status == ERROR_USUARIO_NO_EXISTE) {
          this.visibleMenuUsuario = true;
        } else {
          this.visibleMenuUsuario = false;
        }
      });
    }
  }

  private construirFormularioBuscarUsuario() {
    this.usuarioBuscarForm = new FormGroup({
      numeroDocumento: new FormControl(this.citaService.usuarioSeleccionado.numeroDocumento, [Validators.required, Validators.maxLength(LONGITUD_MAXIMA_PERMITIDA_DOCUMENTO)]),
      tipoDocumento: new FormControl(this.citaService.usuarioSeleccionado.tipoDocumento, [Validators.required])
    });
  }

}