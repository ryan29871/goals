import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { IsAuthenticatedGuard } from './guards/is-authenticated.guard.ts.guard';
import { IsNotAuthenticatedGuard } from './guards/is-not-authenticated.guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'goals',
    pathMatch: 'full'
  },
  {
    path: 'goals',
    loadChildren: () => import('./pages/goals/goals.module').then(m => m.GoalsPageModule),
    canActivate: [IsAuthenticatedGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthPageModule),
    canActivate: [IsNotAuthenticatedGuard]
  },
  {
    path: '**',
    redirectTo: 'goals'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
