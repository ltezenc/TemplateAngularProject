import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardThreeRoutingModule } from './dashboard-three-routing.module';
import { DashboardThreeComponent } from './dashboard-three.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    DashboardThreeComponent
  ],
  imports: [
    CommonModule,
    DashboardThreeRoutingModule,
    NgApexchartsModule
  ]
})
export class DashboardThreeModule { }
