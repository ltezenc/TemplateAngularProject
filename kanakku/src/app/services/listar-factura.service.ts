import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FacturaListI } from '../model/facturalist.interface';

@Injectable({
  providedIn: 'root'
})
export class ListarFacturaService {

 
  constructor(private http:HttpClient) { }

  getFacturacionCliente(id:number):Observable<FacturaListI[]>{
    const url= "http://localhost:8080/clienteslibres/facturacion/"+id+"/listar"
    console.log(this.http.get<FacturaListI[]>(url))
    
    return this.http.get<FacturaListI[]>(url)
    
  }

  getFacturacion():Observable<FacturaListI[]>{
    
    return this.http.get<FacturaListI[]>("http://localhost:8080/clienteslibres/facturacion/listar")
    
  }
}
