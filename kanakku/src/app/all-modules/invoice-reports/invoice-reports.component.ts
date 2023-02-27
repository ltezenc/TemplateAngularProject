import {  Component,  OnInit,} from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-invoice-reports',
  templateUrl: './invoice-reports.component.html',
  styleUrls: ['./invoice-reports.component.css'],
})
export class InvoiceReportsComponent implements OnInit {
  invoices: any = [];
  errorMessage: any;
  url: any = "invoices";
  public tempId: any;
  dtOptions: any = {};

  constructor() {}

  ngOnInit(): void {
  }

 
 
}
