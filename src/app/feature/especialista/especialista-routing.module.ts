import { NgModule } from '@angular/core';
import { EspecialistaComponent } from './components/especialista/especialista.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: EspecialistaComponent,
    children: [
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class EspecialistaRoutingModule { }
