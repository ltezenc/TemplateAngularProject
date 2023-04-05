import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './facturas-routing.module';
import { PaymentsComponent } from './facturas.component';
import { PaymentsListComponent } from './lista-facturas/lista-facturas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { DataTablesModule } from "angular-datatables";


@NgModule({
  declarations: [
    PaymentsComponent,
    PaymentsListComponent,

  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    PaymentsRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    DataTablesModule

  ]
})
export class PaymentsModule { }
