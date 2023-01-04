import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditExpensesComponent } from './edit-expenses/edit-expenses.component';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';
import { ExpensesComponent } from './ficheros.component';

const routes: Routes = [
  {path:'',component:ExpensesComponent,
  children: [
    { path: "expenses-list", component: ExpensesListComponent },
    { path: "edit-expenses", component: EditExpensesComponent},
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesRoutingModule { }
