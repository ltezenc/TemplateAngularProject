import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewHistoricoComponent } from './view-historico.component';

const routes: Routes = [
  {
    path: '',
    component: ViewHistoricoComponent,
    children: []
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewHistoricoModule {}
