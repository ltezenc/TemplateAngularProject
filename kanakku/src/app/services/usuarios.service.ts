import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { loginI } from '../model/login.interface';
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

  getUsuarios():Observable<Usuarios[]>{

    return this.http.get<Usuarios[]>(environment.url_global+"/clienteslibres/usuarios/listar-usuarios")

  }
  updatepass(usuario:loginI):Observable<loginI>{
    return this.http.post<loginI>(environment.url_global+"/clienteslibres/usuarios/actualizar-password",usuario)
  }
  // delete(cliente:Cliente):Observable<Cliente>{
  //   return this.http.post<Cliente>(this.url,cliente)
  // }
  validusers(usuario:loginI):Observable<loginI>{
    return this.http.post<loginI>(environment.url_global+"/clienteslibres/usuarios/verificar-usuario",usuario)
  }

}
