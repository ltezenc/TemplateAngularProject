import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { AllModulesService } from '../../services/all-modules.service';

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

  constructor(private srvModuleService: AllModulesService) {}

  ngOnInit(): void {
  }

 
 
}
