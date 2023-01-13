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
  constructor(private http:HttpClient) { }

  create(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(environment.url_global+"/clienteslibres/clientes/crear",cliente)
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
  delete(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(environment.url_global+"/clienteslibres/clientes/eliminar-clientesandsuministro",cliente)
  }

}
