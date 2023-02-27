import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacturaListI } from 'src/app/model/facturalist.interface';
import { ListarFacturaService } from 'src/app/services/listar-factura.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-report-e',
  templateUrl: './report-e.component.html',
  styleUrls: ['./report-e.component.css']
})
export class ReportEComponent implements OnInit {
  facturas:FacturaListI[];
  cadena=[]
  constructor(public service:ListarFacturaService,private _route:ActivatedRoute ) {
  }

  ngOnInit(): void {
    let id= +this._route.snapshot.paramMap.get("id");

      this.service.getFacturacionClienteNgc(id).subscribe(res=>{
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
  name = 'ExcelSheet.xlsx';
  exportToExcel(): void {
    let element = document.getElementById('season-tble');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const book: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, worksheet, 'Reporte NGC');

    XLSX.writeFile(book, this.name);
  }
}

