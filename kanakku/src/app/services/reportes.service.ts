import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { environment } from "src/environments/environment"
import { reportes } from "../model/reportes"

@Injectable({
    providedIn: 'root'
  })
  
  export class ReportesService {
    modalSwitch:boolean
    constructor(private http:HttpClient) { }
  
    getReporteFacturas(id : number):Observable<reportes[]>{
      return this.http.get<reportes[]>(environment.url_global+"/clienteslibres/reportes/r-facturas/"+id)
    }
  
  }