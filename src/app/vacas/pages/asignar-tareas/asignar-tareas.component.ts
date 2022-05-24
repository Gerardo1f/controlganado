import { Component, OnInit,ViewChild } from '@angular/core';
import { VacasService } from '../../services/vacas.service';
import { AuthService } from './../../../auth/services/auth.service';
import { Usuario } from './../../../auth/interfaces/auth.interfaces';
import { Tarea } from './../../interfaces/vacas.interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NuevaTareaComponent } from './nueva-tarea/nueva-tarea.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-asignar-tareas',
  templateUrl: './asignar-tareas.component.html',
  styles: [
    `
    td ,th{
      text-align: center ;
      height: 60px;
      vertical-align: middle;
  }
  
  .th-title{
      text-align: center;
  
  }
    `
  ]
})
export class AsignarTareasComponent implements OnInit {

  dataSource : any;
  tareas: Tarea[] | undefined ;
  @ViewChild(MatTable  ) table: MatTable<Tarea> | undefined  ;
  constructor(private vacasService:VacasService , private authServices : AuthService ,  private _snackBar: MatSnackBar ,public dialog: MatDialog ) { }
  get usuario(){
    return this.authServices.Auth;
    
  }




  initColumns: any[] = [
    {
      name: 'usuario',
      display: 'Obrero'
    },
    {
      name: 'descripcion',
      display: 'Descripción'
    },
    {
      name: 'estatus',
      display: 'Estatus'
    }
   
  ];

  displayedColumns: any[] = this.initColumns.map(col => col.name);


  ngOnInit(): void {
    this.vacasService.pestana = 'Listado de Tareas';
    this.vacasService.obtenerTareasSupervisor( this.usuario?.id).subscribe(
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

  nuevaTarea(){
    let dialogRef = this.dialog.open(NuevaTareaComponent, {
      width: '400px'
    

    });


    dialogRef.afterClosed().subscribe( result => {
      if(result)
      this.tareas?.push(result);
      

      console.log(result);
      if(this.table)
        this.table.renderRows();
      
    });
  }

 

}
