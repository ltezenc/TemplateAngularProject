import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrapDropRoutingModule } from './drap-drop-routing.module';
import { DrapDropComponent } from './drap-drop.component';


@NgModule({
  declarations: [
    DrapDropComponent
  ],
  imports: [
    CommonModule,
    DrapDropRoutingModule
  ]
})
export class DrapDropModule { }
