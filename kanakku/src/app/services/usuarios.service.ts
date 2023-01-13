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
  private url:string="http://localhost:8080/clienteslibres/usuarios/crear"
  constructor(private http:HttpClient) { }

  create(usuarios:Usuarios):Observable<Usuarios>{
    return this.http.post<Usuarios>(this.url,usuarios)
  }
  // crearsuministro(suministro:Suministro):Observable<Suministro>{
  //   return this.http.post<Suministro>(environment.postsumunistro,suministro)
  // }
  // getTarifa():Observable<tarifaI[]>{

  // }
  getUsuarios():Observable<Usuarios[]>{

    return this.http.get<Usuarios[]>("http://localhost:8080/clienteslibres/usuarios/listar-usuarios")

  }
  // delete(cliente:Cliente):Observable<Cliente>{
  //   return this.http.post<Cliente>(this.url,cliente)
  // }

}
