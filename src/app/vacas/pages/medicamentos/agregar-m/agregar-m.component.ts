import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VacasService } from 'src/app/vacas/services/vacas.service';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-agregar-m',
  templateUrl: './agregar-m.component.html',
  styleUrls: ['./agregar-m.component.css']
})
export class AgregarMComponent  {

  hoy : Date= new Date();
  mesesNum:string[] = [ '01' , '02' , '03' , '04' ,'05', '06', '07', '08' ,'09' ,'10' ,'11','12'];
   
  fechaActual = this.hoy.getFullYear() + '-' +this.mesesNum[this.hoy.getMonth() + 1] + "-" +  this.hoy.getDate() ;

  fecha : string = '';

  nMedicamento: string = '';
  
  constructor(
    private vacasService:VacasService ,
    public dialogRef: MatDialogRef<AgregarMComponent>,
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
    console.log(id);
    this.vacasService.newMedicamento(this.fecha , this.nMedicamento , id ).subscribe(resp => {
      console.log(resp);
      this.dialogRef.close();
    });
  }
  
  ver( event : any){
    this.fecha = event.target.value;
  }

  setValuenMedicamento(event :string){
    this.nMedicamento = event;

  }
}
