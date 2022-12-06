import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from './charts.component';

const routes: Routes = [
  {
     path: '',
    component: ChartsComponent,
    children: [
      { 
        path: 'apexcharts', 
        loadChildren: () => 
          import('./apexcharts/apexcharts.module').then(
            (m) => m.ApexchartsModule) 
      }, 
      { 
        path: 'chartjs', 
        loadChildren: () => 
          import('./chartjs/chartjs.module').then(
            (m) => m.ChartjsModule) 
      }, 
      { 
        path: 'morrischarts', 
        loadChildren: () => 
          import('./morrischarts/morrischarts.module').then(
            (m) => m.MorrischartsModule) 
      }, 
      { 
        path: 'flotcharts', 
        loadChildren: () => 
          import('./flotcharts/flotcharts.module').then(
            (m) => m.FlotchartsModule) 
      }, 
      { 
        path: 'peitycharts', 
        loadChildren: () => 
          import('./peitycharts/peitycharts.module').then(
            (m) => m.PeitychartsModule) 
      }, 
      { 
        path: 'c3charts', 
        loadChildren: () => 
          import('./c3charts/c3charts.module').then(
            (m) => m.C3chartsModule) 
      }
    ]
  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
