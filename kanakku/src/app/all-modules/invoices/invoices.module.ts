import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { InvoicesComponent } from './invoices.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InvoiceGridComponent } from './invoice-grid/invoice-grid.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';

import { DataTablesModule } from 'angular-datatables';
import { TemplateInvoiceComponent } from './template-invoice/template-invoice.component';
import { ReportEComponent } from './report-e/report-e.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    InvoicesComponent,
    InvoiceGridComponent,
    ViewInvoiceComponent,
    ReportEComponent,
    TemplateInvoiceComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    InvoicesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    DataTablesModule,
    NgApexchartsModule

  ],
})
export class InvoicesModule {}
