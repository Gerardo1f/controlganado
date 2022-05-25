import { Component, OnInit } from '@angular/core';
import { VacasService } from 'src/app/vacas/services/vacas.service';
import { ActivatedRoute, ParamMap, Router} from '@angular/router'

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  constructor( private vacaService : VacasService , private router: Router ,  private Activate_route: ActivatedRoute) { }


  habilitar : boolean = false;
  id : string | null = null ;
  nombre : string = '';
  nombreFail :string = 'Escribe nombre del empleado';

  codigoEmpleado : string = '';
  codigoEmpleadoFail : string = 'Escribe codigo empleado';

 


  apellidoMat : string = '';
  apellidoMatFail : string = 'Escribe apellido materno ';


  apellidoPat: string = '';
  apellidoPatFail: string = 'Escribe apellido paterno';

  password : string = '';
  passwordFail:string = 'Escribe la contraseña';


  idRol: any = '1';
  idRolFail : string ='Selecciona un Rol';

  ngOnInit(): void {
    this.vacaService.pestana='Agregar usuario';

    this.Activate_route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') ; 
    });

    if(this.id){
      this.vacaService.pestana='Editar usuario';
  
        this.vacaService.obtenerUsuario(this.id).subscribe(
          resp => {
            this.habilitar= true;
            this.nombre= resp.nombre;
            this.apellidoPat = resp.apellido_paterno;
            this.apellidoMat = resp.apellido_materno;
            this.codigoEmpleado = resp.codigoEmpleado;

            this.idRol= `${resp.idRol}` ;
         
          }
  
        )
  
  
      }

  }

  setRol( event : number){

    this.idRol = event;


  }
  guardar(){
    if(!this.id){
      console.log("entra");
      this.vacaService.crearUsuario(this.nombre, this.apellidoPat, this.apellidoMat , this.codigoEmpleado , this.password , this.idRol).subscribe(
        resp =>{
          console.log(resp);
          if(!resp.resultado){
            if(resp.msg.nombre)
            this.nombreFail = resp.msg.nombre;
            if(resp.msg.apellido_paterno)
              this.apellidoPatFail= resp.msg.apellido_paterno;
            if(resp.msg.apellido_materno)
              this.apellidoMatFail = resp.msg.apellido_materno;
            if(resp.msg.codigoEmpleado)
              this.codigoEmpleadoFail = resp.msg.codigoEmpleado;
            if(resp.msg.password)
            this.passwordFail = resp.msg.password;
            if(resp.msg.idRol)
            this.idRolFail = resp.msg.idRol;
          }else{
            this.router.navigate(['./vacas/listaUsuarios']);
  
          }
  
      });

    }else {

      this.vacaService.editarUsuario(this.id,this.nombre, this.apellidoPat, this.apellidoMat , this.codigoEmpleado , this.password , this.idRol).subscribe(
        resp =>{
          console.log(resp);
          if(!resp.resultado){
            if(resp.msg.nombre)
            this.nombreFail = resp.msg.nombre;
            if(resp.msg.apellido_paterno)
              this.apellidoPatFail= resp.msg.apellido_paterno;
            if(resp.msg.apellido_materno)
              this.apellidoMatFail = resp.msg.apellido_materno;
            if(resp.msg.codigoEmpleado)
              this.codigoEmpleadoFail = resp.msg.codigoEmpleado;
            if(resp.msg.password)
            this.passwordFail = resp.msg.password;
            if(resp.msg.idRol)
            this.idRolFail = resp.msg.idRol;
          }else{
            this.router.navigate(['./vacas/listaUsuarios']);
  
          }
  
      });



    }


  }

  cancelar(){
    this.router.navigate(['./vacas/listaUsuarios']);

  }

}
 