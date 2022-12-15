import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ParametroComponent} from '../../parametro/parametro.component'
import { UpdateComponent } from '../../parametro/update/update.component'
import { ExpensesListRoutingModule } from './expenses-list-routing.module';


@NgModule({
  declarations: [
    ParametroComponent,UpdateComponent
  ],
  imports: [
    CommonModule,
    ExpensesListRoutingModule
  ]
})
export class ExpensesListModule { }
