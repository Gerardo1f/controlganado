import { Component, OnInit ,ViewChild } from '@angular/core';
import { Vaca } from '../../interfaces/vacas.interfaces';
import { VacasService } from '../../services/vacas.service';
import {MatTable} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { InseminacionComponent } from './inseminacion/inseminacion.component';
import { Inseminacion } from './../../interfaces/vacas.interfaces';
import { InseminacionesComponent } from './inseminaciones/inseminaciones.component';
import { Router} from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls:['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  vacas : Vaca[] = [];
  @ViewChild(MatTable  ) table: MatTable<Vaca> | undefined  ;
  inseminaciones : Inseminacion | null = null;
  
  
  
  constructor( private vacasService:VacasService , public dialog: MatDialog , private _snackBar: MatSnackBar , private router: Router ) { }

  initColumns: any[] = [
    {
      name: 'codigoVaca',
      display: 'Codigo Vaca'
    },
    {
      name: 'pesoKgs',
      display: 'Peso'
    },
    {
      name: 'razaName',
      display: 'Raza'
    },
    {
        name: 'ultimaInseminacion',
        display: 'Ultima Inseminacion'
    },
    {
      name: 'fechaNac',
      display: 'Fecha Nacimiento'
    },
    {
      name: 'id',
      display: 'Opciones'
    }
   
  ];
  
  // Displayed columns array of strings
  displayedColumns: any[] = this.initColumns.map(col => col.name);
  getVacas(){
    this.vacasService.getVacas().subscribe(resp => {
      this.vacas = resp;
   })
   
   if(this.table)
   this.table.renderRows();
   
   return this.vacas;
  }
  ngOnInit(): void {
    this.vacasService.pestana = 'Listado de Vacas';
    this.getVacas();
  }
  
  eliminar(id : number){
    
    this.vacasService.DeleteVaca(id ).subscribe(resp => {
     console.log(resp)

     let snackBarRef = this._snackBar.open('Se elimino correctamente');
   })
   
   this.vacas = this.vacas.filter((item) => item.id!=id);
   
   if(this.table)
    this.table.renderRows();
   
   
  }

  openInseminaciones(id:number): void {

   


    let dialogRef = this.dialog.open(InseminacionesComponent, {
      width: '400px',
      data: { id: id}

    });
  
    dialogRef.afterClosed().subscribe( result => {

      
      if(this.table)
        this.table.renderRows();
      
    });
  }
  
  
  openDialog(id:number): void {
    let dialogRef = this.dialog.open(InseminacionComponent, {
      width: '400px',
      data: { id: id}
    });
  
    dialogRef.afterClosed().subscribe( result => {
        this.vacas.map( item => {
          if(item.id == result.id){
              if(!item.ultimaInseminacion   ||  item.ultimaInseminacion < result.fecha   ){
                item.ultimaInseminacion = result.fecha;
              }
          }
          
          return item;
      });
      
      console.log(this.vacas);
      
      
      
      if(this.table)
        this.table.renderRows();
      
    });
  }
  
  
 

  InseminacionSuccess(id:number){

    this.vacasService.InseminacionSuccess(id ).subscribe(resp => {
      console.log(resp)
     let snackBarRef = this._snackBar.open('La vaca quedó preñada' , 'Cerrar');

    })

    this.vacas.map( item => {
      if(item.id == id){
        item.prenada =1;
      }
      
      return item;
  });



  }

  editar(id : number){
    this.router.navigate(['./vacas/editar/' + id]);


  }


  liberar(id : number){
    this.vacasService.liberar( id ).subscribe( res => {
      console.log(res);
      this.vacas.map( item => {
        if(item.id == id){
          item.prenada = 0;
        }
        return item;
    });

    })
  }
 
  
 

}
