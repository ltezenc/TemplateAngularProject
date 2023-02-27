import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { listaFicherosComponent } from './lista-ficheros.component';

const routes: Routes = [
  {path:'',component:listaFicherosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpensesListRoutingModule { }
