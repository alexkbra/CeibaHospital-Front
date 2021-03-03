import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CitaComponent } from './components/cita/cita.component';
import { CitaRoutingModule } from './cita-routing.module';
import { CitaService } from './shared/service/cita.service';
import { CrearCitaComponent } from './components/crear-cita/crear-cita.component';
import { ListarCitaComponent } from './components/listar-cita/listar-cita.component';
import { EditarCitaComponent } from './components/editar-cita/editar-cita.component';

@NgModule({
  declarations: [
    CrearCitaComponent,
    EditarCitaComponent,
    ListarCitaComponent,
    CitaComponent
  ],
  imports: [
    CitaRoutingModule,
    SharedModule
  ],
  providers : [CitaService]

})
export class CitaModule { }
