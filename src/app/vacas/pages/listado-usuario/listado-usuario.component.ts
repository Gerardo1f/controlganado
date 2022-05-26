import { Component, OnInit ,ViewChild } from '@angular/core';
import { Vaca } from '../../interfaces/vacas.interfaces';
import { VacasService } from '../../services/vacas.service';
import {MatTable , MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Inseminacion } from './../../interfaces/vacas.interfaces';
import { Router} from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from './../../../auth/interfaces/auth.interfaces';
@Component({
  selector: 'app-listado-usuario',
  templateUrl: './listado-usuario.component.html',
  styleUrls: ['./listado-usuario.component.css']
})
export class ListadoUsuarioComponent implements OnInit {

  dataSource : any;

  usuarios : Usuario[] = [];
  @ViewChild(MatTable  ) table: MatTable<Usuario> | undefined  ;
   
  
  
  
  constructor( private vacasService:VacasService , public dialog: MatDialog , private _snackBar: MatSnackBar , private router: Router ) { }

  initColumns: any[] = [
    {
      name: 'nombre',
      display: 'Nombre'
    },
    {
      name: 'codigoEmpleado',
      display: 'Código Empleado'
    },
    {
      name: 'rol',
      display: 'Rol'
    } ,
    {
      name:'opciones',
      display: 'Opciones'
    }
   
  ];
  
  // Displayed columns array of strings
  displayedColumns: any[] = this.initColumns.map(col => col.name);
  getUsers(){

    this.vacasService.obtenerObreros().subscribe(resp => {
      this.usuarios = resp;
      this.dataSource = new MatTableDataSource(this.usuarios);
   })
   
   if(this.table)
   this.table.renderRows();
    
  }
  ngOnInit(): void {

    this.vacasService.pestana = 'Listado de Usuarios';
    this.getUsers();
  }
  
  eliminar(id : number){
    
    this.vacasService.DeleteUsuario(id ).subscribe(resp => {
     console.log(resp)

     let snackBarRef = this._snackBar.open('Se elimino correctamente' , 'Cerrar');
   })
   
   this.usuarios = this.usuarios.filter((item) => item.id!=id);
   
   if(this.table)
    this.table.renderRows();
   
   
  }

  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
 

  
 
  
 

 

  editar(id : number){
    this.router.navigate(['./vacas/editarUser/' + id]);

  }


   
 
}
