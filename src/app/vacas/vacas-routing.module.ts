import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { VacaComponent } from './pages/vaca/vaca.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { HomeComponent } from './pages/home/home.component';
import { LechexdiasComponent } from './pages/lechexdias/lechexdias.component';
import { ReporteLecheComponent } from './pages/reporte-leche/reporte-leche.component';
import { TareasAsignadasComponent } from './pages/tareas-asignadas/tareas-asignadas.component';
import { AsignarTareasComponent } from './pages/asignar-tareas/asignar-tareas.component';




const rutas: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'listado', component: ListadoComponent },
      { path: 'agregar', component: AgregarComponent },
      { path: 'editar/:id', component: AgregarComponent },
      { path: 'buscar', component: BuscarComponent },
      { path: 'lechexdia', component: LechexdiasComponent },
      { path: 'reporteleche', component: ReporteLecheComponent },
      { path: 'mistareas', component: TareasAsignadasComponent },
      { path: 'asignartareas', component: AsignarTareasComponent },
      { path: '**', redirectTo: 'listado' }
    ]
  }
];



@NgModule({
  imports: [
RouterModule.forChild( rutas )
  ],
  exports: [
    RouterModule
  ]
})
export class VacaRoutingModule { }
