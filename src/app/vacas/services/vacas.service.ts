import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Raza, Result, Vaca } from '../interfaces/vacas.interfaces';
import { Respuesta } from '../interfaces/vacas.interfaces';
import { Inseminacion, LecheXdias, Tarea } from './../interfaces/vacas.interfaces';
import { Usuario } from './../../auth/interfaces/auth.interfaces';

@Injectable({
  providedIn: 'root'
})
export class VacasService {

  constructor( private http : HttpClient) { }

  private pagina:string = '';

  set pestana( pagina:string){
    this.pagina= pagina;
  }

  get pestana(){
    return this.pagina;
  }
  
  getVacas() : Observable<Vaca[]>{
    return this.http.get<Vaca[]>('http://159.223.204.114/api/vacas/index');
  }
  
  DeleteVaca(id : number) : Observable<Respuesta>{
    return this.http.post<Respuesta>('http://159.223.204.114/api/vacas/delete',{
      'id':id,
      'viva':0
    });
  }
  
  
  Inseminar(id : number,fecha:string) : Observable<Respuesta>{
    return this.http.post<Respuesta>('http://159.223.204.114/api/vacas/inseminacion',{
      'idVaca':id,
      'fecha':fecha
    });
  }


  guardarVaca(objVaca :Vaca){
    return this.http.post<Respuesta>('http://159.223.204.114/api/vacas/create',
      objVaca
    );

  }


  editarVaca(objVaca :Vaca){
    return this.http.post<Respuesta>('http://159.223.204.114/api/vacas/update',
      objVaca
    );

  }

  InseminacionSuccess(id : number) : Observable<Respuesta>{
    return this.http.post<Respuesta>('http://159.223.204.114/api/vacas/inseminacionSuccess',{
      'idVaca':id,
    });
  }

  Inseminaciones(id : number) : Observable<Inseminacion>{
    return this.http.post<Inseminacion>('http://159.223.204.114/api/vacas/inseminaciones',{
      'idVaca':id,
    });
  }


  lecheXdias(fecha? : string ):Observable<LecheXdias>{
    return this.http.post<LecheXdias>('http://159.223.204.114/api/vacas/vacasXleche',{
      'fecha':fecha
    });
  }


  guardarLeche(arrVacas? : Result[] ,fecha? : string ):Observable<Respuesta>{
    return this.http.post<Respuesta>('http://159.223.204.114/api/vacas/guardarLeche',{
      'vacas':arrVacas,
      'fecha':fecha
    });
  }

  obtenerReporteAnual(){
    return this.http.get<any>('http://159.223.204.114/api/vacas/reporteAnual');


  }

  obtenerReporteMensual(fecha : string){
    return this.http.post<any>('http://159.223.204.114/api/vacas/reporteMensual',{
      fecha:fecha
    });


  }

  obtenerReporteMensualIndividual(fecha : string, codigoVaca:string){
    return this.http.post<any>('http://159.223.204.114/api/vacas/reporteMensualIndividual',{
      fecha:fecha,
      codigoVaca:codigoVaca
    });


  }


  obtenerTareasObrero(idUsuario : number | undefined):Observable<Tarea[]>{
    return this.http.post<Tarea[]>('http://159.223.204.114/api/tareas/index',{
      idusuario: idUsuario
    });


  }


  obtenerTareasSupervisor(idUsuario : number | undefined):Observable<Tarea[]>{
    return this.http.post<Tarea[]>('http://159.223.204.114/api/tareas/indexSupervisor',{
      idusuario: idUsuario
    });


  }

  cambiarEstatus(id: number, estado :number) : Observable<Respuesta>{
    return this.http.post<Respuesta>('http://159.223.204.114/api/tareas/cambiarEstatus',{
      id: id,
      estado:estado
    });

  }

  obtenerObreros( )  : Observable<Usuario[]>{
    return this.http.get<Usuario[]>('http://159.223.204.114/api/tareas/indexObreros');
  }

  GuardarTarea(  idObrero : number |  null, idSupervisor : number |  undefined , descripcion : string)  : Observable<Tarea[]>{
    return this.http.post<Tarea[]>('http://159.223.204.114/api/tareas/create',{
      idObrero  : idObrero,
      idSupervisor:idSupervisor,
      descripcion:descripcion
    });
  }


  ObtenerVaca(id : string) : Observable <Vaca>{
    return this.http.get<Vaca>('http://159.223.204.114/api/vacas/obtenerVaca/'+ id);

  }

  obtenerRazas() : Observable<Raza[]>{
    return this.http.get<Raza[]>('http://159.223.204.114/api/vacas/razas');


  }


  liberar( id: number ) : Observable<Vaca>{
    return this.http.post<Vaca>('http://159.223.204.114/api/vacas/liberar',{
      id  : id
    });
  }
}

