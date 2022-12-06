import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardTwoRoutingModule } from './dashboard-two-routing.module';
import { DashboardTwoComponent } from './dashboard-two.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    DashboardTwoComponent
  ],
  imports: [
    CommonModule,
    DashboardTwoRoutingModule,
    NgApexchartsModule
  ]
})
export class DashboardTwoModule { }
