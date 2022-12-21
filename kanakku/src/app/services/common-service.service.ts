import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { FacturaListI } from '../model/facturalist.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonServiceService {

  messages:any =  '';
  SERVER_URL: string = 'http://localhost:8080/api/';
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


  // Kanakku services
  getCustomers() {
    return this.http.get(this.SERVER_URL + 'customers');
  }

  getEstimates() {
    return this.http.get(this.SERVER_URL + 'estimates');
  }

  getInvoices() {
    return this.http.get(this.SERVER_URL + 'invoices');
  }

  getPayments() {
    return this.http.get(this.SERVER_URL + 'payments');
  }

  getExpenses() {
    return this.http.get(this.SERVER_URL + 'expenses');
  }
  getCategories() {
    return this.http.get(this.SERVER_URL + 'categories');
  }

 
}
