import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Respuesta } from 'src/app/vacas/interfaces/vacas.interfaces';
import { Usuario } from './../interfaces/auth.interfaces';
import { map, tap } from 'rxjs/operators'
import { Observable,of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private http: HttpClient) { }
  private _user : Usuario | undefined;


  get Auth(){
    return this._user;
  }

  verificaAuth() : Observable<boolean> { 

    if(!localStorage.getItem('numEmpleado')){
      return of(false);
    }

    return this.http.post<Usuario>('http://159.223.204.114/api/user/userAuth',{
      'numempleado': localStorage.getItem('numEmpleado')
    }).pipe(
      map(
        auth => {
          this._user= auth;
          return true;
        }
      )
    );
  }

  login( numEmpleado:number , password : string){
    return this.http.post<Usuario>('http://159.223.204.114/api/auth/login',{
      'numempleado':numEmpleado,
      'password':password
    }).pipe(
      tap( resp => {
        this._user = resp;
        if(resp)
        localStorage.setItem('numEmpleado', resp.codigoEmpleado );
        

      } )
    );
  }

  getInfoUser(numEmpleado : string | null){
    this.http.post<Usuario>('http://159.223.204.114/api/user/userAuth',{
      'numempleado':numEmpleado,
    }).pipe(
      tap( resp => {
        this._user = resp;
        if(resp)
        localStorage.setItem('numEmpleado', resp.codigoEmpleado );
        

      } )
    );



  }

  logout(){
    this._user= undefined;
  }
}
