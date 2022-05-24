import { Component, OnInit } from '@angular/core';
import { Raza } from '../../interfaces/vacas.interfaces';
import { Vaca } from './../../interfaces/vacas.interfaces';
import { VacasService } from 'src/app/vacas/services/vacas.service';
import { ActivatedRoute, ParamMap, Router} from '@angular/router'
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
  ]
})
export class AgregarComponent implements OnInit {

  habilitar:boolean = false;
  id: string | null= null;
  meses:string[] = [ 'Enero' , 'Febrero' , 'Marzo' , 'Abril' ,'Mayo', 'Junio', 'Julio', 'Agosto' ,'Septiempre' ,'Octubre' ,'Noviembre','Diciembre'];
  mesesNum:string[] = [ '01' , '02' , '03' , '04' ,'05', '06', '07', '08' ,'09' ,'10' ,'11','12'];

  constructor( private VacasService:VacasService , private router: Router , private dateAdapter: DateAdapter<Date>  ,  private Activate_route: ActivatedRoute) {  this.dateAdapter.setLocale('en-GB'); }
  
  hoy : Date= new Date();
  fechaActual = this.hoy.getFullYear() + '-' +this.mesesNum[this.hoy.getMonth() + 1] + "-" +  this.hoy.getDate() ;
  fecha : string = '2022-12-06';


  

  options:Raza[] = [
    
  ];

   objVaca: Vaca = {
    codigoVaca: '',
    pesoKgs:0,
    idRaza:0,
    fechaNac: null,
    viva:1

  };

  codigoValid:string = 'Introduce 8 caracteres';
  pesoValid:string = 'Introduce peso en Kg';
  idRazaValid:string = 'MM/DD/YYYY';
  fechaValid:string = 'Selecciona una raza';
  
  setValueCodigo(event: any){
    this.objVaca.codigoVaca = event;
  }

  setValuePeso(event : any){
    this.objVaca.pesoKgs=event;
  }
  
 


  idRaza:number = 0;

  ngOnInit(): void {
    this.Activate_route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') ; 
    })
    this.VacasService.pestana='Agregar Vaca';

    this.VacasService.obtenerRazas().subscribe(
      resp => {
        this.options = resp;
      }
    )

    

    if(this.id){
      this.VacasService.ObtenerVaca(this.id).subscribe(
        resp => {
          this.objVaca= resp;
          this.habilitar = true;
        }

      )


    }
  }


  guardarVaca(){
    
    if(this.id){
      this.VacasService.editarVaca(this.objVaca).subscribe(resp =>{
        if(!resp.resultado){
          if(resp.msg.pesoKgs)
            this.pesoValid= resp.msg.pesoKgs;
          if(resp.msg.idRaza)
            this.idRazaValid = resp.msg.idRaza;
          if(resp.msg.fechaNac)
            this.fechaValid = resp.msg.fechaNac;
        }else{
          this.router.navigate(['./vacas/listado']);
        }
      });

      return ;
    }
    
    this.VacasService.guardarVaca(this.objVaca).subscribe(resp =>{
      console.log(resp);
      if(!resp.resultado){
        if(resp.msg.codigoVaca)
        this.codigoValid = resp.msg.codigoVaca;
        if(resp.msg.pesoKgs)
          this.pesoValid= resp.msg.pesoKgs;
        if(resp.msg.idRaza)
          this.idRazaValid = resp.msg.idRaza;
        if(resp.msg.fechaNac)
          this.fechaValid = resp.msg.fechaNac;
      }else{
        this.router.navigate(['./vacas/listado']);
      }
    });


   
    
  }


  setRaza ( event : any){
    this.objVaca.idRaza = event; 

  }

  
  setDate(event: Date){

    let date = event;
    let fecha = date.getFullYear() + '-' +this.mesesNum[date.getMonth() + 1] + "-" +  date.getDate() ;
    this.objVaca.fechaNac=fecha;



  }
}
