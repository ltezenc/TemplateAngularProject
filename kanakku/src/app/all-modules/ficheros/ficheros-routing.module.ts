import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { listaFicherosComponent } from './lista-ficheros/lista-ficheros.component';
import { ExpensesComponent } from './ficheros.component';

const routes: Routes = [
  {path:'',component:ExpensesComponent,
  children: [
    { path: "lista-ficheros", component: listaFicherosComponent },
]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesRoutingModule { }
