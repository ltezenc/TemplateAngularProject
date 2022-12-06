import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HorizontalRoutingModule } from './horizontal-routing.module';
import { HorizontalComponent } from './horizontal.component';


@NgModule({
  declarations: [
    HorizontalComponent
  ],
  imports: [
    CommonModule,
    HorizontalRoutingModule
  ]
})
export class HorizontalModule { }
