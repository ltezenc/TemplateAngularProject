import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { PeriodoFactura } from "../model/PeriodoFactura";


@Injectable({
  providedIn: 'root'
})
export class CerrarprocesoService {

  constructor(public http: HttpClient) { }
  cerrarproceso(){
    //console.log(environment.url_global+"clienteslibres/documentos/1/1/cerrarproceso")
    return this.http.get(environment.url_global+"/clienteslibres/documentos/1/1/cerrarproceso")
    
  }
  getpfactura():Observable<PeriodoFactura[]>{

    return this.http.get<PeriodoFactura[]>(environment.url_global+"/clienteslibres/pfactura/obtener")

  }
}
