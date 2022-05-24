import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Usuario } from './../../interfaces/auth.interfaces';
import { VacasService } from 'src/app/vacas/services/vacas.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:[ './login.component.css']
})
export class LoginComponent  {

  constructor(private Router:Router, private authService : AuthService ,private vacasService: VacasService) { }
  usuario : Usuario | undefined;

  codigoEmp:number | null = null ;
  pass : string = '';

  errCodigoEmp :string = 'Ingrese su número de 8 caracteres';
  errPass:string = 'Ingrese su contraseña';

  err : string = '';
  setValueCodigo(event: any){
    this.codigoEmp= event;
  }

  setValuePass(event:any){
    this.pass = event;
  }

  login(){
    
    console.log(this.codigoEmp);
    this.authService.login( this.codigoEmp! , this.pass).subscribe(
      resp => {
        if(resp){
          this.usuario = resp;
          this.vacasService.pestana='Listado de Vacas';
          this.Router.navigate(['./vacas']);
        }else{
          this.err = 'Los datos no coinciden con ningun registro';

        }

      }

        
    );




  }
}
