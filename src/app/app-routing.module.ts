import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from '@core/guard/security.guard';
import { HomeComponent } from '@home/home.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [SecurityGuard]  },
  { path: 'cita', loadChildren:()=> import('./feature/cita/cita.module').then(mod => mod.CitaModule) },
  { path: 'usuario', loadChildren: () => import('./feature/usuario/usuario.module').then(mod => mod.UsuarioModule) },
  { path: 'especialista', loadChildren: () => import('./feature/especialista/especialista.module').then(mod => mod.EspecialistaModule ) }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
