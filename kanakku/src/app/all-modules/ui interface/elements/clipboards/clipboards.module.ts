import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClipboardsRoutingModule } from './clipboards-routing.module';
import { ClipboardsComponent } from './clipboards.component';
import { ClipboardModule } from 'ngx-clipboard';


@NgModule({
  declarations: [
    ClipboardsComponent
  ],
  imports: [
    CommonModule,
    ClipboardsRoutingModule,
    ClipboardModule
  ]
})
export class ClipboardsModule { }
