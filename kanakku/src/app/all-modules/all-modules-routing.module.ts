import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from '../core/auth/authentication.guard';
import { AllModulesComponent } from './all-modules.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "index",
    pathMatch: "full",
  },
  {
    path:"",
    component:AllModulesComponent,
    children:[
     /* {
        path: 'index',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [AuthenticationGuard],

      },
*/
      {
        path: 'index',
        loadChildren: () =>
          import('./ficheros/lista-ficheros/lista-ficheros.module').then((m)=>m.ExpensesListModule),
                  canActivate: [AuthenticationGuard],

      },
      {
          path: 'clientes',
          loadChildren: () =>
            import('./clientes/clientes.module').then((m) => m.CustomersModule),
          canActivate: [AuthenticationGuard],

        },

       
        {
          path: 'invoices',
          loadChildren: () =>
            import('./invoices/invoices.module').then((m) => m.InvoicesModule),
          canActivate: [AuthenticationGuard],
        },

        {
          path: 'facturas',
          loadChildren: () =>
            import('./facturas/facturas.module').then(
              (m) => m.PaymentsModule
            ),
          canActivate: [AuthenticationGuard],
        },
        {
          path: 'parametro',
          loadChildren: () =>
            import('./parametro/parametro.module').then(
              (m) => m.ParametroModule
            ),
          canActivate: [AuthenticationGuard],
        },
        {
          path: 'ficheros',
          loadChildren: () =>
            import('./ficheros/ficheros.module').then(
              (m) => m.ExpensesModule
            ),
          canActivate: [AuthenticationGuard],

        },
      
        {
          path: 'setting',
          loadChildren: () =>
            import('./setting/setting.module').then((m) => m.SettingModule),
          canActivate: [AuthenticationGuard],

        },

        {
          path: 'historico-clientes',
          loadChildren: () =>
            import('./HistoricoporCliente/HistoricoporCliente.module').then(
              (m) => m.ProfileModule
            ),
          canActivate: [AuthenticationGuard],

        },


        {
          path: 'transactions',
          loadChildren: () =>
            import('./transactions/transactions.module').then(
              (m) => m.TransactionsModule
            ),
          canActivate: [AuthenticationGuard],

        },

        {
          path: 'close-process',
          loadChildren: () =>
            import('./close-process/close.module').then((m) => m.CustomersModule),
          canActivate: [AuthenticationGuard],
        },


        {
          path: 'historico',
          loadChildren: () =>
            import('./invoices/invoices.module').then((m) => m.InvoicesModule),
          canActivate: [AuthenticationGuard],
        },
        {
          path: 'view-historico-cliente',
          loadChildren: () =>
            import('./view-historico/view-historico.module').then((m) => m.ViewHistoricModule),
          canActivate: [AuthenticationGuard],
        },


        {
          path: 'users',
          loadChildren: () =>
            import('./users/users.module').then((m) => m.UersModule),
          canActivate: [AuthenticationGuard],
        },

    ]
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllModulesRoutingModule { }
