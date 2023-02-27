import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './setting.component';

const routes: Routes = [
  {
    path: '',
    component: SettingComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  
      {
        path: 'delete-account',
        loadChildren: () =>
          import('./delete-account/delete-account.module').then(
            (m) => m.DeleteAccountModule
          ),
      },
      
      {
        path: 'notifications',
        loadChildren: () =>
          import('./notifications/notifications.module').then((m) => m.NotificationsModule),
      },
  
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'change-password',
        loadChildren: () =>
          import('./change-password/change-password.module').then((m) => m.ChangePasswordModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
