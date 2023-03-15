import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { rfacturas } from '../model/r-facturas.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ReportesService {
  modalSwitch:boolean
  constructor(private http:HttpClient) { }

  getReporteFacturas(id : number):Observable<rfacturas[]>{
    return this.http.get<rfacturas[]>(environment.url_global+"/clienteslibres/reportes/r-facturas/"+id)
  }

}
