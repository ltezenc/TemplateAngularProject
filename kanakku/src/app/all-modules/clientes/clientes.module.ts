import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from "angular-datatables";
import {NgxPaginationModule} from 'ngx-pagination';
import { CustomersComponent } from './clientes.component';
import { CustomersRoutingModule } from './clientes-routing.module';
import { CustomerListComponent } from './listar-clientes/customer-list.component';
import { AddCustomerComponent } from './agregar-clientes/add-customer.component';
import { EditCustomerComponent } from './editar-clientes/edit-customer.component';
@NgModule({
  declarations: [ CustomersComponent,CustomerListComponent,AddCustomerComponent,EditCustomerComponent],
  imports: [CommonModule, CustomersRoutingModule, RouterModule,ReactiveFormsModule,FormsModule,DataTablesModule,NgxPaginationModule],
})
export class CustomersModule {}
