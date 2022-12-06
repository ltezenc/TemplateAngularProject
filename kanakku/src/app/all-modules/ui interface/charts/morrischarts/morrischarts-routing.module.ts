import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MorrischartsComponent } from './morrischarts.component';

const routes: Routes = [{ path: '', component: MorrischartsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MorrischartsRoutingModule { }
