import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { parametrosI } from '../model/parametros';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {


  constructor(private http:HttpClient) { }

  getparametrosbyfactura():Observable<parametrosI[]>{
    
    return this.http.get<parametrosI[]>("http://localhost:8080/clienteslibres/parametros/1/listar")
    
  }
}
