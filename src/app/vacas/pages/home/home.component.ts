import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../../auth/services/auth.service';
import { Usuario } from './../../../auth/interfaces/auth.interfaces';
import { VacasService } from 'src/app/vacas/services/vacas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
    .container{
      margin: auto;
      
    }
    `
  ]
})
export class HomeComponent  {


  get usuario(){
    return this.authService.Auth;
  }

  get pestana(){
    return this._vacasService.pestana;
  }

  constructor( private router : Router , private authService: AuthService , private _vacasService : VacasService) { }

  

 


  logout(){
    localStorage.removeItem('numEmpleado')
      this.router.navigate(['./auth'])
  }
}
