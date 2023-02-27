import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './HistoricoporCliente.component';
import { ProfileRoutingModule } from './HistoricoporCliente-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ ProfileComponent ],
  imports: [CommonModule, ProfileRoutingModule, RouterModule],
})
export class ProfileModule {}
