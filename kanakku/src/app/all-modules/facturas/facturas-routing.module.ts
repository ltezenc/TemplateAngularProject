import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentsListComponent } from './lista-facturas/lista-facturas.component';
import { PaymentsComponent } from './facturas.component';

const routes: Routes = [
  {path:'',component:PaymentsComponent,
  children: [
    { path: "lista-facturas", component: PaymentsListComponent},
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentsRoutingModule { }
