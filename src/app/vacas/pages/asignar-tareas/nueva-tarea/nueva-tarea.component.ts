import { Component, OnInit } from '@angular/core';
import { Usuario } from './../../../../auth/interfaces/auth.interfaces';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from './../../../../auth/services/auth.service';
import { VacasService } from 'src/app/vacas/services/vacas.service';
import { Tarea } from './../../../interfaces/vacas.interfaces';


@Component({
  selector: 'app-nueva-tarea',
  templateUrl: './nueva-tarea.component.html',
  styleUrls: ['./nueva-tarea.component.css']
})
export class NuevaTareaComponent implements OnInit {
  options:Usuario[]  | undefined;

  
  errorObrero : string = 'Selecciona un obrero';
  descripcion : string = '';
  idObrero:number | null = null;
  errorDescripcion :string='Escribe una descripción';
  constructor( private vacaService: VacasService ,  public dialogRef: MatDialogRef<NuevaTareaComponent>, private authService : AuthService ) { }

  ngOnInit(): void {
    this.vacaService.obtenerObreros().subscribe(
      resp => {
        this.options = resp;
      }
    )
    
  }

  setObrero(value : number){
    this.idObrero =  value;
  }
  
  onCancel(): void {
    this.dialogRef.close();
  }


  setValueDescripcion(descripcion : string){
    this.descripcion = descripcion;
  }

  guardar(){

    if(!this.idObrero){
      this.errorObrero = 'Olvidate seleciconar un obrero!';
      return;
    }

    if(this.descripcion.length == 0){
      this.errorDescripcion = 'Olvidaste una descripción';
      return;
    }
    
    this.vacaService.GuardarTarea( this.idObrero, this.authService.Auth?.id ,this.descripcion).subscribe(
      resp => {
      
        this.dialogRef.close(resp);

      }
    )
     

  }


}
