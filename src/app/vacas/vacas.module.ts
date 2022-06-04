import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacaRoutingModule } from './vacas-routing.module';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { VacaComponent } from './pages/vaca/vaca.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { MaterialModule } from '../material/material.module';
import { InseminacionComponent } from './pages/listado/inseminacion/inseminacion.component';
import { FormsModule } from '@angular/forms';
import { InseminacionesComponent } from './pages/listado/inseminaciones/inseminaciones.component';
import { LechexdiasComponent } from './pages/lechexdias/lechexdias.component';
import { ReporteLecheComponent } from './pages/reporte-leche/reporte-leche.component';
import { ChartsModule } from 'ng2-charts';
import { TareasAsignadasComponent } from './pages/tareas-asignadas/tareas-asignadas.component';
import { AsignarTareasComponent } from './pages/asignar-tareas/asignar-tareas.component';
import { NuevaTareaComponent } from './pages/asignar-tareas/nueva-tarea/nueva-tarea.component';
import { CrearUsuarioComponent } from './pages/crear-usuario/crear-usuario.component';
import { ListadoUsuarioComponent } from './pages/listado-usuario/listado-usuario.component';
import { MedicamentosComponent } from './pages/medicamentos/medicamentos.component';
import { VerComponent } from './pages/medicamentos/ver/ver.component';
import { AgregarMComponent } from './pages/medicamentos/agregar-m/agregar-m.component';




@NgModule({
  declarations: [
    AgregarMComponent,
    AgregarComponent,
    BuscarComponent,
    VacaComponent,
    HomeComponent,
    ListadoComponent,
    InseminacionComponent,
    InseminacionesComponent,
    LechexdiasComponent,
    ReporteLecheComponent,
    TareasAsignadasComponent,
    AsignarTareasComponent,
    NuevaTareaComponent,
    CrearUsuarioComponent,
    ListadoUsuarioComponent,
    MedicamentosComponent,
    VerComponent
    
       
  ],
  imports: [
  CommonModule,
  VacaRoutingModule,
  MaterialModule    ,
  FormsModule,
  ChartsModule
  ]
})
export class VacasModule { }
