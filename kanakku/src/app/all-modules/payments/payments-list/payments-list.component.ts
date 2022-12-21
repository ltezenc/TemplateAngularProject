import { Component, OnInit, ViewChild } from '@angular/core';
import { FacturaListI } from 'src/app/model/facturalist.interface';
import { CommonServiceService } from 'src/app/services/common-service.service';
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
  constructor(public commonService: CommonServiceService) { }

  ngOnInit(): void {
    this.listarFacturas();
  }

  listarFacturas(){
    this.commonService.getFacturacion().subscribe(res=>{
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
