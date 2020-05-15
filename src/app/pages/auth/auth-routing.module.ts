import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthPage } from './auth.page';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPage,
    children: [
      {
        path: 'signin',
        component: SignInComponent,
      },
      {
        path: 'signup',
        component: SignUpComponent,
      },
      {
        path: '',
        redirectTo: '/auth/signin'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthPageRoutingModule { }
