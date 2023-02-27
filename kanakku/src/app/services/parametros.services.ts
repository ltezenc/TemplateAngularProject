import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { parametrosI } from '../model/parametros';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {


  constructor(private http:HttpClient) { }

  getparametrosbyfactura():Observable<parametrosI>{
    return this.http.get<parametrosI>(environment.url_global+"/clienteslibres/parametros/1/listar")

  }

  updateparametro(parametro:parametrosI):Observable<parametrosI>{
    return this.http.post<parametrosI>(environment.url_global+"/clienteslibres/parametros/1/actualizar",parametro)
  }

  crearparametro(parametro:parametrosI):Observable<parametrosI>{
  
    return this.http.post<parametrosI>(environment.url_global+"/clienteslibres/parametros/1/crear",parametro)
  }
}
