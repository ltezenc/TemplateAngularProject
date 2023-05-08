import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FacturaListI } from 'src/app/model/facturalist.interface';
import { ListarFacturaService } from 'src/app/services/listar-factura.service';
import { DataTableDirective } from 'angular-datatables'
import * as alertifyjs from 'alertifyjs';
@Component({
  selector: 'app-payments-list',
  templateUrl: './lista-facturas.component.html',
  styleUrls: ['./lista-facturas.component.css']
})
export class PaymentsListComponent implements OnInit {
  payments: any = [];
  errorMessage: any;
  public loader_general: boolean;
  facturas: FacturaListI[];

  dtTrigger: any = new Subject();
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;

  constructor(public facturaService: ListarFacturaService) { this.loader_general = true; }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'simple_numbers',
      language: {
        url: 'https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json'
      }
    }
    this.listarFacturas();
  }

  listarFacturas() {
    this.facturaService.getFacturacion().subscribe(res => {
      this.loader_general = false;
      this.facturas = res["facturacionListResponse"];
      this.initDatatable();
      console.log("facturas: ", this.facturas)
    },error => alertifyjs.error('¡Ocurrió un error '+error.status+'!'))
  }

  initDatatable() {
    if (this.isDtInitialized) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    } else {
      this.isDtInitialized = true;
      this.dtTrigger.next();
    }
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
