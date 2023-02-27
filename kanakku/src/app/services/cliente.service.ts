import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from '../model/cliente';
import { FacturaListI } from '../model/facturalist.interface';
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
  delete(id:number){
    return this.http.delete(environment.url_global+"/clienteslibres/clientes/eliminar-clientesandsuministro/"+id)
  }
  getClienteById(id:number):Observable<Cliente[]>{

    return this.http.get<Cliente[]>(environment.url_global+"/clienteslibres/clientes/listar/"+id)

  }
  update(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(environment.url_global+"/clienteslibres/clientes/actualizar",cliente)
  }
  getsuministroCliente(id:number):Observable<Suministro[]>{

    return this.http.get<Suministro[]>(environment.url_global+"/clienteslibres/suministro/suministro-cliente/"+id)

  }
  getHistoricoSuministro(suministro:string):Observable<FacturaListI[]>{
    return this.http.get<FacturaListI[]>(environment.url_global+"/clienteslibres/clientes/listarhistorico/"+suministro)
  }
  getHistoricoSuministroFactura(id:string,fact:string):Observable<FacturaListI[]>{
    return this.http.get<FacturaListI[]>(environment.url_global+"/clienteslibres/suministro/buscar-suministro-historico/"+id+"/"+fact)
  }
  getBuscarHistoricoSuministro(suministro:string):Observable<FacturaListI[]>{
    return this.http.get<FacturaListI[]>(environment.url_global+"/clienteslibres/clientes/buscarhistorico/"+suministro)
  }
}
