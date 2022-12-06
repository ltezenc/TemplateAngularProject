import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { C3chartsComponent } from './c3charts.component';

const routes: Routes = [{ path: '', component: C3chartsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class C3chartsRoutingModule { }
