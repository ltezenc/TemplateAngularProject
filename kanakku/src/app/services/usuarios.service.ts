import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuarios } from '../model/usuarios';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  modalSwitch:boolean
  constructor(private http:HttpClient) { }

  create(usuarios:Usuarios):Observable<Usuarios>{
    return this.http.post<Usuarios>(environment.url_global+"/clienteslibres/usuarios/crear",usuarios)
  }
  // crearsuministro(suministro:Suministro):Observable<Suministro>{
  //   return this.http.post<Suministro>(environment.postsumunistro,suministro)
  // }
  // getTarifa():Observable<tarifaI[]>{
  //   return this.http.get<tarifaI[]>("http://ms-clienteslibres.gescom.cloud/clienteslibres/tarifa/listar")

  // }
  getUsuarios():Observable<Usuarios[]>{

    return this.http.get<Usuarios[]>(environment.url_global+"/clienteslibres/usuarios/listar-usuarios")

  }
  // delete(cliente:Cliente):Observable<Cliente>{
  //   return this.http.post<Cliente>(this.url,cliente)
  // }

}
