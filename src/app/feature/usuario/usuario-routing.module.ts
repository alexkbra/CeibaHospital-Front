import { NgModule } from '@angular/core';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { Routes, RouterModule } from '@angular/router';
import { ListarUsuarioComponent } from './components/listar-usuario/listar-usuario.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';

const routes: Routes = [
  {
    path: '',
    component: UsuarioComponent,
    children: [
      {
        path : 'crear',
        component : CrearUsuarioComponent
      },{
        path : 'listar',
        component : ListarUsuarioComponent
      },{
        path : 'editar',
        component : EditarUsuarioComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UsuarioRoutingModule { }
