import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VacasService } from 'src/app/vacas/services/vacas.service';
import { DateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-inseminacion',
  templateUrl: './inseminacion.component.html',
  styleUrls: ['./inseminacion.component.css']
})
export class InseminacionComponent  {

  hoy : Date= new Date();
  mesesNum:string[] = [ '01' , '02' , '03' , '04' ,'05', '06', '07', '08' ,'09' ,'10' ,'11','12'];
   
  fechaActual = this.hoy.getFullYear() + '-' +this.mesesNum[this.hoy.getMonth() + 1] + "-" +  this.hoy.getDate() ;

  fecha : string = '';
  
  constructor(
    private vacasService:VacasService ,
    public dialogRef: MatDialogRef<InseminacionComponent>,
    private dateAdapter: DateAdapter<Date>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.dateAdapter.setLocale('en-GB');
     }
  
  onCancel(): void {
    this.dialogRef.close();
  }

  setDate(event: Date){
    let date = event;

    let fecha = date.getFullYear() + '-' +this.mesesNum[date.getMonth() + 1] + "-" +  date.getDate() ;

    this.fecha=fecha;



  }
  
 
  
  guardar(id:number){
    this.vacasService.Inseminar(id,this.fecha).subscribe(resp => {
      console.log(resp)
    });
    this.dialogRef.close( {fecha : this.fecha , id :id });
  }
  
  ver( event : any){
    this.fecha = event.target.value;
  }

}
