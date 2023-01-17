import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewHistoricoComponent } from './view-historico.component';
import { ViewHistoricoModule } from './view-historico.component.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ ViewHistoricoComponent ],
  imports: [CommonModule, ViewHistoricoModule, RouterModule],
})
export class ViewHistoricModule {}

