import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlotchartsComponent } from './flotcharts.component';

const routes: Routes = [{ path: '', component: FlotchartsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlotchartsRoutingModule { }
