import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { CommonServiceService } from '../../../services/common-service.service';
import * as $ from 'jquery';
import { FacturaListI } from 'src/app/model/facturalist.interface';
import { ActivatedRoute } from '@angular/router';
import { ListarFacturaService } from 'src/app/services/listar-factura.service';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css'],
})
export class ViewInvoiceComponent implements OnInit {
  invoices: any = [];
  errorMessage: any;
  dtOptions: any = {};
  facturas:FacturaListI[];
  cadena=[]
  constructor(
    public service:ListarFacturaService,private _route:ActivatedRoute
  ) {
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
