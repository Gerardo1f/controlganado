import { Component, OnInit ,ViewChild } from '@angular/core';
import { Vaca } from '../../interfaces/vacas.interfaces';
import { VacasService } from '../../services/vacas.service';
import {MatTable , MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Inseminacion } from './../../interfaces/vacas.interfaces';
import { Router} from '@angular/router'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from './../../../auth/interfaces/auth.interfaces';
import { AgregarMComponent } from './agregar-m/agregar-m.component';
import { VerComponent } from './ver/ver.component';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css']
})
export class MedicamentosComponent implements OnInit {
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
        display: 'Historial Medico'
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
  
  openDialog(id:number): void {
    let dialogRef = this.dialog.open(AgregarMComponent, {
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
  openMedicamentos(id:number): void {

   


    let dialogRef = this.dialog.open(VerComponent, {
      width: '400px',
      data: { id: id}

    });
  
    dialogRef.afterClosed().subscribe( result => {

      
      if(this.table)
        this.table.renderRows();
      
    });
  }
  
 
 

 

}
