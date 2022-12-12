import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FacturaListI } from '../model/facturalist.interface';

@Injectable({
  providedIn: 'root'
})
export class ListarFacturaService {


  constructor(private http:HttpClient) { }

  getFacturacionCliente(id:number):Observable<FacturaListI[]>{
    const url= environment.url_global+"/clienteslibres/facturacion/"+id+"/listar"
    console.log(this.http.get<FacturaListI[]>(url))

    return this.http.get<FacturaListI[]>(url)

  }

  getFacturacion():Observable<FacturaListI[]>{

    return this.http.get<FacturaListI[]>(environment.url_global+"/clienteslibres/facturacion/listar")

  }
}
