import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesRoutingModule } from './ficheros-routing.module';
import { ExpensesComponent } from './ficheros.component';
import { ExpensesListComponent } from './expenses-list/expenses-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ParametroComponent } from '../parametro/parametro.component';
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [
    ExpensesComponent,
    ExpensesListComponent,

    ParametroComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    ExpensesRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    DataTablesModule,
    FormsModule
  ]
})
export class ExpensesModule { }
