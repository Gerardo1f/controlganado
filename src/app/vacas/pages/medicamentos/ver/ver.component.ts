import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VacasService } from 'src/app/vacas/services/vacas.service';

@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css']
})
export class VerComponent implements OnInit {

  medicamentos : any  ;

  constructor(   public dialogRef: MatDialogRef<VerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any , private vacasService:VacasService) { }

  ngOnInit(): void {
    this.vacasService.medicamentos(this.data.id).subscribe(
      resp =>{
        console.log(resp);
        this.medicamentos= resp;
      } 
    );
  }

  verInseminaciones(){
    console.log(this.medicamentos);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
