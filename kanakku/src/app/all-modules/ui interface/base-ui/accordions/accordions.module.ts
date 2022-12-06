import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordionsRoutingModule } from './accordions-routing.module';
import { AccordionsComponent } from './accordions.component';


@NgModule({
  declarations: [
    AccordionsComponent
  ],
  imports: [
    CommonModule,
    AccordionsRoutingModule
  ]
})
export class AccordionsModule { }
