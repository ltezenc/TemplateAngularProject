import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpensesRoutingModule } from './ficheros-routing.module';
import { ExpensesComponent } from './ficheros.component';
import { listaFicherosComponent } from './lista-ficheros/lista-ficheros.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParametroComponent } from '../parametro/parametro.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { DataTablesModule } from 'angular-datatables';



@NgModule({
  declarations: [
    ExpensesComponent,
    listaFicherosComponent,
    ParametroComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    ExpensesRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
  ]
})
export class ExpensesModule { }
