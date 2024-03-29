import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FicheroListI } from '../model/ficherolist.interface';
import { Superexcel } from '../model/superexcel';

@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private http:HttpClient) { }

  sendPost(body:FormData):Observable<any>{
    return this.http.post(environment.url_global+"/clienteslibres/documentos/1/1/importar-documentodepulsos",body)

  }
  sendPostCRCRM(body:FormData):Observable<any>{
    return this.http.post(environment.url_global+"/clienteslibres/documentos/1/1/importar-documentodecrcm",body)
  }
  sendPostPliegoTarifario(body:FormData):Observable<any>{
    return this.http.post(environment.url_global+"/clienteslibres/documentos/1/1/importar-documentodepliegotarifario",body)
  }
  suministroexist(nombre:string){
    let nom=nombre.substring(0,8);
    let resp=this.http.get(environment.url_global+"/clienteslibres/suministro/buscar-suministro/"+nom)
    return resp
     }

     delete(eliminado:FicheroListI){
      let resp=this.http.post(environment.url_global+"/clienteslibres/documentos/1/1/eliminar-documentodepulsos/",eliminado)
      return resp
       }

  getFichero():Observable<FicheroListI[]>{

    return this.http.get<FicheroListI[]>(environment.url_global+"/clienteslibres/documentos/1/1/documentodepulsosbyusuarioidandempresaid")

  }
  getSuperexcel():Observable<Superexcel[]>{
    return this.http.get<Superexcel[]>(environment.url_global+"/clienteslibres/documentos/1/1/listar-super-excel")

  }


}
