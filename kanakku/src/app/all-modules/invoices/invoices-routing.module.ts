import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'src/app/core/auth/authentication.guard';

import { InvoiceGridComponent } from './invoice-grid/invoice-grid.component';

import { InvoicesComponent } from './invoices.component';

import { TemplateInvoiceComponent } from './template-invoice/template-invoice.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';

const routes: Routes = [
  {
    path: '',
    component: InvoicesComponent,
    canActivate: [AuthenticationGuard],
    children: [

      { path: "invoice-grid", component: InvoiceGridComponent },
    
      { path: "view-invoice/:id", component: ViewInvoiceComponent },

      { path: "template-invoice/:id", component: TemplateInvoiceComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesRoutingModule { }
