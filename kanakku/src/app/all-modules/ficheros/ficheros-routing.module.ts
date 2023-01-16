import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';
import { ExpensesComponent } from './ficheros.component';

const routes: Routes = [
  {path:'',component:ExpensesComponent,
  children: [
    { path: "expenses-list", component: ExpensesListComponent },
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesRoutingModule { }
