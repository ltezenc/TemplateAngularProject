import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { C3chartsRoutingModule } from './c3charts-routing.module';
import { C3chartsComponent } from './c3charts.component';


@NgModule({
  declarations: [
    C3chartsComponent
  ],
  imports: [
    CommonModule,
    C3chartsRoutingModule
  ]
})
export class C3chartsModule { }
