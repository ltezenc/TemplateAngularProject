import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeitychartsComponent } from './peitycharts.component';

const routes: Routes = [{ path: '', component: PeitychartsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeitychartsRoutingModule { }
