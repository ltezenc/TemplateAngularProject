import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MorrischartsRoutingModule } from './morrischarts-routing.module';
import { MorrischartsComponent } from './morrischarts.component';


@NgModule({
  declarations: [
    MorrischartsComponent
  ],
  imports: [
    CommonModule,
    MorrischartsRoutingModule
  ]
})
export class MorrischartsModule { }
