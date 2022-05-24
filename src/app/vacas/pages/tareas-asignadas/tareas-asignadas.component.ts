import { Component, OnInit,ViewChild } from '@angular/core';
import { VacasService } from '../../services/vacas.service';
import { AuthService } from './../../../auth/services/auth.service';
import { Usuario } from './../../../auth/interfaces/auth.interfaces';
import { Tarea } from './../../interfaces/vacas.interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTable, MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-tareas-asignadas',
  templateUrl: './tareas-asignadas.component.html',
  styleUrls: ['./tareas-asignadas.component.css']
})
export class TareasAsignadasComponent implements OnInit {

  dataSource : any;
  tareas: Tarea[] | undefined ;
  @ViewChild(MatTable  ) table: MatTable<Tarea> | undefined  ;
  constructor(private vacasService:VacasService , private authServices : AuthService ,  private _snackBar: MatSnackBar) { }
  get usuario(){
    return this.authServices.Auth;
    
  }




  initColumns: any[] = [
    {
      name: 'supervisor',
      display: 'Supervisor'
    },
    {
      name: 'descripcion',
      display: 'Descripción'
    },
    {
      name: 'estatus',
      display: 'Estatus'
    },
    {
        name: 'id',
        display: 'Opciones'
    }
   
  ];

  displayedColumns: any[] = this.initColumns.map(col => col.name);


  ngOnInit(): void {
    this.vacasService.pestana = 'Listado de Tareas';
    this.vacasService.obtenerTareasObrero( this.usuario?.id).subscribe(
      resp => {
        this.tareas =resp;

         this.dataSource = new MatTableDataSource(this.tareas);

      }
    )


  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cambiarEstatus(estatus:number, id : number){
    console.log(estatus);
    let aux = estatus===2 ? 'En proceso' : 'Finalizado';

    console.log(aux);
    console.log(estatus);

    this.tareas?.map( tarea => {

      if( id == tarea.id ){
        this.vacasService.cambiarEstatus(id, estatus).subscribe(
          res => {
            if(res.resultado){
              let snackBarRef = this._snackBar.open('Se cambio el estatus correctamente', 'Cerrar');

            }
          }
        )
        tarea.estado= estatus;
        tarea.estatus=aux;
      }
    })


  }

}
