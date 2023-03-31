import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCustomerComponent } from './agregar-clientes/add-customer.component';
import { CustomersComponent } from './clientes.component';
import { EditCustomerComponent } from './editar-clientes/edit-customer.component';
import { CustomerListComponent } from './listar-clientes/customer-list.component';

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    children: [
      { path: "listar-clientes", component: CustomerListComponent },
      { path: "agregar-clientes", component: AddCustomerComponent},
      { path: "editar-clientes", component: EditCustomerComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
