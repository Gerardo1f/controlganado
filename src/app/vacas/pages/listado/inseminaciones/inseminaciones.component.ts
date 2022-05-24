import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inseminacion } from './../../../interfaces/vacas.interfaces';
import { VacasService } from 'src/app/vacas/services/vacas.service';
@Component({
  selector: 'app-inseminaciones',
  templateUrl: './inseminaciones.component.html',
  styleUrls: ['./inseminaciones.component.css']
})
export class InseminacionesComponent implements OnInit {


  inseminaciones : Inseminacion  = 
  { resultado: true, inseminaciones : [ {   
    id:        0,
    idVaca:    0
  } ] };

  constructor(   public dialogRef: MatDialogRef<InseminacionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any , private vacasService:VacasService) { }

  ngOnInit(): void {
    this.vacasService.Inseminaciones(this.data.id).subscribe(
      resp =>{
        console.log(resp);
        this.inseminaciones= resp;
      } 
    );
  }

  verInseminaciones(){
    console.log(this.inseminaciones);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
