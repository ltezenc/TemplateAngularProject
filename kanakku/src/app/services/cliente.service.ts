import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../model/cliente';
import { Suministro } from '../model/suministro';
import { tarifaI } from '../model/tarifa.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  modalSwitch:boolean
  private url:string="http://localhost:8080/clienteslibres/clientes/crear"
  constructor(private http:HttpClient) { }

  create(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.url,cliente)
  }
  crearsuministro(suministro:Suministro):Observable<Suministro>{
    return this.http.post<Suministro>(environment.postsumunistro,suministro)
  }
  getTarifa():Observable<tarifaI[]>{
    return this.http.get<tarifaI[]>("http://localhost:8080/clienteslibres/tarifa/listar")

  }
  getCliente():Observable<Cliente[]>{

    return this.http.get<Cliente[]>("http://localhost:8080/clienteslibres/clientes/listar")

  }
  delete(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.url,cliente)
  }

}
