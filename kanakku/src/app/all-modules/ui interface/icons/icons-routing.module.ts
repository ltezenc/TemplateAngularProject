import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IconsComponent } from './icons.component';

const routes: Routes = [
  { 
    path: '', 
    component: IconsComponent,
    children: [
      { 
        path: 'fontawesome', 
        loadChildren: () => 
          import('./fontawesome/fontawesome.module').then(
            (m) => m.FontawesomeModule) 
      }, 
      { path: 'feathers', loadChildren: () => import('./feathers/feathers.module').then(m => m.FeathersModule) },
      { 
        path: 'ionic', 
        loadChildren: () => 
          import('./ionic/ionic.module').then(
            (m) => m.IonicModule) 
      },
      { 
        path: 'material', 
        loadChildren: () => 
          import('./material/material.module').then(
            (m) => m.MaterialModule) 
      },
      { 
        path: 'pe7', 
        loadChildren: () => 
          import('./pe7/pe7.module').then(
            (m) => m.Pe7Module) 
      }, 
      { 
        path: 'simpline', 
        loadChildren: () => 
          import('./simpline/simpline.module').then(
            (m) => m.SimplineModule) 
      }, 
      { 
        path: 'themify', 
        loadChildren: () => 
          import('./themify/themify.module').then(
            (m) => m.ThemifyModule) 
      },
      { 
        path: 'weather', 
        loadChildren: () => 
          import('./weather/weather.module').then(
            (m) => m.WeatherModule) 
      }, 
      { 
        path: 'typicon', 
        loadChildren: () => 
          import('./typicon/typicon.module').then(
            (m) => m.TypiconModule) 
      },
      { 
        path: 'flag', 
        loadChildren: () => 
          import('./flag/flag.module').then(
            (m) => m.FlagModule) 
      }
    ]
   
  },
   ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IconsRoutingModule { }
