import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlotchartsRoutingModule } from './flotcharts-routing.module';
import { FlotchartsComponent } from './flotcharts.component';


@NgModule({
  declarations: [
    FlotchartsComponent
  ],
  imports: [
    CommonModule,
    FlotchartsRoutingModule
  ]
})
export class FlotchartsModule { }
