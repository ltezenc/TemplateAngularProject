import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeitychartsRoutingModule } from './peitycharts-routing.module';
import { PeitychartsComponent } from './peitycharts.component';


@NgModule({
  declarations: [
    PeitychartsComponent
  ],
  imports: [
    CommonModule,
    PeitychartsRoutingModule
  ]
})
export class PeitychartsModule { }
