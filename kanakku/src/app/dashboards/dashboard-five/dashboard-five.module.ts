import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardFiveRoutingModule } from './dashboard-five-routing.module';
import { DashboardFiveComponent } from './dashboard-five.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    DashboardFiveComponent
  ],
  imports: [
    CommonModule,
    DashboardFiveRoutingModule,
    NgApexchartsModule
  ]
})
export class DashboardFiveModule { }
