import { Component, OnInit,ViewChild } from '@angular/core';
import {MatTable} from '@angular/material/table';
import { LecheXdias,Result } from '../../interfaces/vacas.interfaces';
import { VacasService } from 'src/app/vacas/services/vacas.service';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-lechexdias',
  templateUrl: './lechexdias.component.html',
  styleUrls: ['./lechexdias.component.css']
})
export class LechexdiasComponent implements OnInit {

  constructor( private _VacasService : VacasService , private dateAdapter: DateAdapter<Date> , private _snackBar: MatSnackBar) {   this.dateAdapter.setLocale('en-GB');}
  @ViewChild(MatTable  ) table: MatTable<Result> | undefined  ;



  vacas : Result[] = [];
  mesesNum:string[] = [ '01' , '02' , '03' , '04' ,'05', '06', '07', '08' ,'09' ,'10' ,'11','12'];

  hoy : Date= new Date();
  fechaActual = this.hoy.getFullYear() + '-' +this.mesesNum[this.hoy.getMonth() + 1] + "-" +  this.hoy.getDate() ;
  fecha : string = '';



  ngOnInit(): void {
    this._VacasService.pestana = 'Registro de litros al día';
  }

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
        name: 'cantidadLts',
        display: 'Leche en litros'
    },
   
  ];
  displayedColumns: any[] = this.initColumns.map(col => col.name)


  setDate(event: Date){
    let date = event;

    let fecha = date.getFullYear() + '-' +this.mesesNum[date.getMonth()  ] + "-" +  date.getDate() ;

    this.fecha=fecha;



  }

  guardarLeche(){
    console.log(this.vacas);
    this._VacasService.guardarLeche(this.vacas , this.fecha).subscribe(
      resp => {
        let snackBarRef = this._snackBar.open('Se guardaron los registros correctamente', 'Cerrar');

        console.log(resp);
      }
    )
  }

  verVacas(){
    console.log( this.fecha);
    this._VacasService.lecheXdias(this.fecha).subscribe(
      resp => {
        console.log(this.vacas);
        this.vacas=resp.result;
      }
    )

  }
  setValue(id: number , event :any){
    this.vacas.map(
      vaca => {
        if(vaca.idVaca == id ){
          
          vaca.cantidadLts=event;
        }
      }
    )
  }

}
