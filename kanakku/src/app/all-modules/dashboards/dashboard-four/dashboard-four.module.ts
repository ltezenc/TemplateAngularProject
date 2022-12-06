import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardFourRoutingModule } from './dashboard-four-routing.module';
import { DashboardFourComponent } from './dashboard-four.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    DashboardFourComponent
  ],
  imports: [
    CommonModule,
    DashboardFourRoutingModule,
    NgApexchartsModule
  ]
})
export class DashboardFourModule { }
