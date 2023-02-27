import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './facturas-routing.module';
import { PaymentsComponent } from './facturas.component';
import { PaymentsListComponent } from './lista-facturas/lista-facturas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PaymentsComponent,
    PaymentsListComponent,

  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    
  ]
})
export class PaymentsModule { }
