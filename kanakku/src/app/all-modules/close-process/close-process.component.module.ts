import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CloseProcessComponent } from './close-process.component';

const routes: Routes = [
  {
    path: '',
    component: CloseProcessComponent,
    children: []
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CloseRoutingModule {}
