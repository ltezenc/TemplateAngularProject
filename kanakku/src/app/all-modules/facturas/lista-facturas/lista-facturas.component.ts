import { Component, OnInit } from '@angular/core';
import { FacturaListI } from 'src/app/model/facturalist.interface';
import { ListarFacturaService } from 'src/app/services/listar-factura.service';
@Component({
  selector: 'app-payments-list',
  templateUrl: './lista-facturas.component.html',
  styleUrls: ['./lista-facturas.component.css']
})
export class PaymentsListComponent implements OnInit {
  payments: any = [];
  errorMessage: any;
  public loader_general: boolean;
  cadena = []
  facturas: FacturaListI[];

  constructor(public facturaService: ListarFacturaService) { this.loader_general = true; }

  ngOnInit(): void {
    this.listarFacturas();
  }

  listarFacturas() {
    this.facturaService.getFacturacion().subscribe(res => {
      this.loader_general = false;
      this.facturas = res;
      let keys = Object.keys(res);

      let i = 0;
      for (let prop of keys) {
        this.cadena.push(res[prop]);
        this.cadena[i]['name'] = prop;
        i++;
      } console.log(this.cadena)
    },
    )
  }


}
