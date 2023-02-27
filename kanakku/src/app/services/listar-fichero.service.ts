import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { FacturaListI } from '../model/facturalist.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {

  messages:any =  '';
  message: BehaviorSubject<String>;
  constructor(public http: HttpClient) {
    this.message = new BehaviorSubject(this.messages);
  }
  getFacturacionCliente(id:number):Observable<FacturaListI[]>{
    const url= environment.url_global+"/clienteslibres/facturacion/"+id+"/listar"
    console.log(this.http.get<FacturaListI[]>(url))

    return this.http.get<FacturaListI[]>(url)

  }

  getFacturacion():Observable<FacturaListI[]>{

    return this.http.get<FacturaListI[]>(environment.url_global+"/clienteslibres/facturacion/listar")

  }
  nextmessage(data:any) {
    this.message.next(data);
  }

 
}
