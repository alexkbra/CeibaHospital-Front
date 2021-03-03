import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { EspecialistaService } from './shared/service/especialista.service';
import { EspecialistaComponent } from './components/especialista/especialista.component';
import { EspecialistaRoutingModule } from './especialista-routing.module';

@NgModule({
  declarations: [
    EspecialistaComponent
  ],
  imports: [
    EspecialistaRoutingModule,
    SharedModule
  ],
  providers: [EspecialistaService]
})
export class EspecialistaModule { }
