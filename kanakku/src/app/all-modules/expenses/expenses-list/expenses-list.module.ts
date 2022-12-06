import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ParametroComponent} from '../../parametro/parametro.component'
import { ExpensesListRoutingModule } from './expenses-list-routing.module';
import { ExpensesListComponent } from './expenses-list.component';


@NgModule({
  declarations: [
    ParametroComponent
  ],
  imports: [
    CommonModule,
    ExpensesListRoutingModule
  ]
})
export class ExpensesListModule { }
