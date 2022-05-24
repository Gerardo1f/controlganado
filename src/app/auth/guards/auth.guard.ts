import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

// 
export class AuthGuard implements CanLoad,CanActivate {

  constructor(private AuthService: AuthService , private _router : Router){}

   canActivate(
     route: ActivatedRouteSnapshot,
     state: RouterStateSnapshot): Observable<boolean > | Promise<boolean> | boolean {
      return this.AuthService.verificaAuth().pipe(
        tap(autenticado => {
          if(!autenticado){
            this._router.navigate(['./auth/login'])
          }
        }
        )
      );
    }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean>  | boolean {
      
      return this.AuthService.verificaAuth().pipe(
        tap(autenticado => {
          if(!autenticado){
            this._router.navigate(['./auth/login'])
          }
        }
        )
      );

     
  }
}
