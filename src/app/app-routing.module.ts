import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@core/guards/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'panel',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('@features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'panel',
    loadChildren: () =>
      import('@features/panel/panel.module').then((m) => m.PanelModule),
    /* A guard that prevents the user from accessing the panel module if they are not logged in. */
    canLoad: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
