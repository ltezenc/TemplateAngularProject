import {  Component,  OnInit,} from '@angular/core';
import { FacturaListI } from 'src/app/model/facturalist.interface';
import { ActivatedRoute } from '@angular/router';
import { ListarFacturaService } from 'src/app/services/listar-factura.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
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
  public downloadPDF(): void {
    const DATA = document.getElementById('datafactura');
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
    });
  
  }

  
}
