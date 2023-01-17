import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacturaListI } from 'src/app/model/facturalist.interface';
import { ListarFacturaService } from 'src/app/services/listar-factura.service';

@Component({
  selector: 'app-template-invoice',
  templateUrl: './template-invoice.component.html',
  styleUrls: ['./template-invoice.component.css']
})
export class TemplateInvoiceComponent implements OnInit {

  facturas:FacturaListI[];
   cadena=[]
  constructor(private service:ListarFacturaService,private _route:ActivatedRoute) {
    console.log(this._route.snapshot.paramMap.get("id"))
   }


  ngOnInit(): void {
    let id= +this._route.snapshot.paramMap.get("id");

    //obtiene valores de la factura
      this.service.getFacturacionCliente(id).subscribe(res=>{
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
