import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
// import { AllModulesData } from 'src/assets/all-modules-data/all-modules-data';
import { id } from 'src/assets/all-modules-data/id';
import { Cliente } from '../model/cliente';
import { Superexcel } from '../model/superexcel';
import { Suministro } from '../model/suministro';
import { environment } from 'src/environments/environment';
import { tarifaI } from '../model/tarifa.interface';
import { FacturaListI } from '../model/facturalist.interface';

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
    return this.http.post<Suministro>(environment.url_global+"/clienteslibres/suministro/crear",suministro)
  }
  getTarifa():Observable<tarifaI[]>{
    return this.http.get<tarifaI[]>(environment.url_global+"/clienteslibres/tarifa/listar")

  }
  getCliente():Observable<Cliente[]>{

    return this.http.get<Cliente[]>(environment.url_global+"/clienteslibres/clientes/listar")

  }
  getsuministroCliente(id:number):Observable<Suministro[]>{

    return this.http.get<Suministro[]>(environment.url_global+"/clienteslibres/suministro/suministro-cliente/"+id)

  }

  getHistoricoSuministroFactura(id:string,fact:string):Observable<FacturaListI[]>{
    return this.http.get<FacturaListI[]>(environment.url_global+"/clienteslibres/suministro/buscar-suministro-historico/"+id+"/"+fact)
  }

  getHistoricoSuministro(suministro:string):Observable<FacturaListI[]>{
    return this.http.get<FacturaListI[]>(environment.url_global+"/clienteslibres/clientes/listarhistorico/"+suministro)
  }

  getBuscarHistoricoSuministro(suministro:string):Observable<FacturaListI[]>{
    return this.http.get<FacturaListI[]>(environment.url_global+"/clienteslibres/clientes/buscarhistorico/"+suministro)
  }

  // Handling Errors
  private handleError(error: any) {
    return throwError(error);
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


  //traer datos superxcel
  getSuperexcel():Observable<Superexcel[]>{
    return this.http.get<Superexcel[]>(environment.url_global+"/clienteslibres/documentos/1/1/listar-super-excel")

  }

}
