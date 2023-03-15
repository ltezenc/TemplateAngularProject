import {  Component,  OnInit, ViewChild} from '@angular/core';
import { FacturaListI } from 'src/app/model/facturalist.interface';
import { ActivatedRoute } from '@angular/router';
import { ListarFacturaService } from 'src/app/services/listar-factura.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ChartComponent,ApexAxisChartSeries,ApexChart,ApexXAxis,ApexDataLabels,ApexTitleSubtitle,ApexStroke,ApexGrid,ApexPlotOptions,ApexYAxis,ApexLegend,ApexTooltip,ApexFill,ApexResponsive } from "ng-apexcharts";
import { ReportesService } from 'src/app/services/reportes.service';
import { rfacturas } from 'src/app/model/r-facturas.interface';


export type ChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis | ApexYAxis[];
  legend: ApexLegend;
  tooltip: ApexTooltip;
  responsive: ApexResponsive[];
  fill: ApexFill;
  labels: string[];

};

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.css'],
})
export class ViewInvoiceComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;
  public chartOptions5: Partial<ChartOptions>;

  invoices: any = [];
  errorMessage: any;
  dtOptions: any = {};
  facturas:FacturaListI[];
  // private r_factura : rfacturas = new rfacturas()
  r_factura:rfacturas[];
  cadena=[]
  pfactura=[]
  total=[]
  constructor(
    public service:ListarFacturaService,private _route:ActivatedRoute,private reporte:ReportesService
  )
  {
    // console.log(this._route.snapshot.paramMap.get("id"))

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

          this.r_facturacion();
          this.charts();

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

  r_facturacion(){
    let id= +this._route.snapshot.paramMap.get("id");
    this.reporte.getReporteFacturas(id).subscribe(data=>{

      this.r_factura = data["clientebyIdReporteResponses"];

      data["clientebyIdReporteResponses"].forEach(element => {
        this.pfactura.push(element.pfactura);
        this.total.push(element.total);
      });


    })

  }

  charts(){
    this.chartOptions5 = {
      series: [
        {
          name: "Total",
          type: "column",
          data: this.total
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      stroke: {
        width: [0, 4]
      },
      title: {
        text: "Reporte ..."
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      labels: this.pfactura,
      // xaxis: {
      //   type: "datetime"
      // },
      yaxis: [
        {
          title: {
            text: "Website Blog"
          }
        },
        {
          opposite: true,
          title: {
            text: "Social Media"
          }
        }
      ]
    };
  }




}
