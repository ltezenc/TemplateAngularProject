import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
// import { AllModulesData } from 'src/assets/all-modules-data/all-modules-data';
import { id } from 'src/assets/all-modules-data/id';
import { Cliente } from '../model/cliente';
import { Suministro } from '../model/suministro';
import { environment } from 'src/environments/environment';
import { tarifaI } from '../model/tarifa.interface';

@Injectable({
  providedIn: 'root',
})
export class AllModulesService {

  // Api Methods for All modules

  public apiurl: any;

  // Headers Setup
  headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers,
  };


  modalSwitch:boolean
  private url:string=environment.url_global+"/clienteslibres/clientes/crear"
  constructor(private http:HttpClient) { }



  create(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.url,cliente)
  }
  crearsuministro(suministro:Suministro):Observable<Suministro>{
    return this.http.post<Suministro>(environment.postsumunistro,suministro)
  }
  getTarifa():Observable<tarifaI[]>{
    return this.http.get<tarifaI[]>(environment.url_global+"/clienteslibres/tarifa/listar")

  }
  getCliente():Observable<Cliente[]>{

    return this.http.get<Cliente[]>("http://ms-clienteslibres.gescom.cloud/clienteslibres/clientes/listar")

  }
  getsuministroCliente(id:number):Observable<Suministro[]>{

    return this.http.get<Suministro[]>("http://ms-clienteslibres.gescom.cloud/clienteslibres/suministro/suministro-cliente/"+id)

  }


  // Handling Errors
  private handleError(error: any) {
    return throwError(error);
  }

  // Get Method Api
  get(type: any): Observable<[]> {
    this.apiurl = `api/${type}`;

    return this.http
      .get<[]>(this.apiurl)
      .pipe(tap(), catchError(this.handleError));
  }

  // Post Method Api
  add(user: any, type: any): Observable<any> {
    this.apiurl = `api/${type}`;
    user.id = null;
    return this.http
      .post<any>(this.apiurl, user, this.httpOptions)
      .pipe(tap(), catchError(this.handleError));
  }

  // Update Method Api
  update(user: any, type: any): Observable<any> {
    this.apiurl = `api/${type}`;
    const url = `${this.apiurl}/${user.id}`;
    return this.http.put<any>(url, user, this.httpOptions).pipe(
      map(() => user),
      catchError(this.handleError)
    );
  }

  // Delete Method Api
  delete(id: id, type: any): Observable<id> {
    this.apiurl = `api/${type}`;
    const url = `${this.apiurl}/${id}`;
    return this.http
      .delete<id>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
 
}
