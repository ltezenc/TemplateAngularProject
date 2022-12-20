import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ParametroComponent} from '../../parametro/parametro.component'
// import { UpdateComponent } from '../../parametro/update/update.component'
import { ExpensesListRoutingModule } from './expenses-list-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    // ParametroComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExpensesListRoutingModule
  ]
})
export class ExpensesListModule { }
