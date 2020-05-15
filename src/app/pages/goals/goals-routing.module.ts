import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoalsPage } from './goals.page';
import { GoalCreateComponent } from './components/goal-create/goal-create.component';
import { GoalEditComponent } from './components/goal-edit/goal-edit.component';
import { GoalListComponent } from './components/goal-list/goal-list.component';
import { GoalDetailComponent } from './components/goal-detail/goal-detail.component';

const routes: Routes = [
  {
    path: '',
    component: GoalsPage,
    children: [
      {
        path: 'create',
        component: GoalCreateComponent,
      },
      {
        path: 'detail/:id',
        component: GoalDetailComponent,
      },
      {
        path: 'edit/:id/status',
        component: GoalEditComponent,
      },
      {
        path: 'list',
        component: GoalListComponent,
      },
      {
        path: '',
        redirectTo: '/goals/list'
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoalsPageRoutingModule { }
