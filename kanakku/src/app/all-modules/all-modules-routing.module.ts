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
          import('./expenses/expenses-list/expenses-list.module').then((m)=>m.ExpensesListModule),
                  canActivate: [AuthenticationGuard],

      },
      {
          path: 'customers',
          loadChildren: () =>
            import('./customers/customers.module').then((m) => m.CustomersModule),
          canActivate: [AuthenticationGuard],

        },

        {
          path: 'estimates',
          loadChildren: () =>
            import('./estimates/estimates.module').then((m) => m.EstimatesModule),
          canActivate: [AuthenticationGuard],
        },
        {
          path: 'invoices',
          loadChildren: () =>
            import('./invoices/invoices.module').then((m) => m.InvoicesModule),
          canActivate: [AuthenticationGuard],
        },

        {
          path: 'payments',
          loadChildren: () =>
            import('./payments/payments.module').then(
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
          path: 'expenses',
          loadChildren: () =>
            import('./expenses/expenses.module').then(
              (m) => m.ExpensesModule
            ),
          canActivate: [AuthenticationGuard],

        },
        {
          path: 'reports',
          loadChildren: () =>
            import('./reports/reports.module').then(
              (m) => m.ReportsModule
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
          path: 'profile',
          loadChildren: () =>
            import('./profile/profile.module').then(
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
