import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class CerrarprocesoService {

  constructor(public http: HttpClient) { }
  cerrarproceso(){
    //console.log(environment.url_global+"clienteslibres/documentos/1/1/cerrarproceso")
    return this.http.get(environment.url_global+"/clienteslibres/documentos/1/1/cerrarproceso")
    
  }
}
