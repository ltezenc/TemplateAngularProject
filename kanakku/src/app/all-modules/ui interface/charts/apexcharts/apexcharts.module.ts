import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApexchartsRoutingModule } from './apexcharts-routing.module';
import { ApexchartsComponent } from './apexcharts.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [
    ApexchartsComponent
  ],
  imports: [
    CommonModule,
    ApexchartsRoutingModule,
    NgApexchartsModule
  ]
})
export class ApexchartsModule { }
