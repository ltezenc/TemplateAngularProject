import { Component, OnInit, ViewChild } from '@angular/core';
import { FacturaListI } from 'src/app/model/facturalist.interface';
import { ListarFacturaService } from 'src/app/services/listar-factura.service';
@Component({
  selector: 'app-payments-list',
  templateUrl: './payments-list.component.html',
  styleUrls: ['./payments-list.component.css']
})
export class PaymentsListComponent implements OnInit {
  payments: any = [];
  errorMessage: any;
  cadena=[]
  facturas:FacturaListI[];
  constructor(public facturaService: ListarFacturaService) { }

  ngOnInit(): void {
    this.listarFacturas();
  }

  listarFacturas(){
    this.facturaService.getFacturacion().subscribe(res=>{
      this.facturas=res;
      let keys= Object.keys(res);
     
      let i = 0;
      for (let prop of keys ) { 
      this.cadena.push(res[prop]);
      this.cadena[i]['name'] = prop;
      i++;
  } console.log(this.cadena)
     },
    )
  }


}
