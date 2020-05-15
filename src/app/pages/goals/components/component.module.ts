import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GoalCreateComponent } from './goal-create/goal-create.component';
import { GoalDetailComponent } from './goal-detail/goal-detail.component';
import { GoalEditComponent } from './goal-edit/goal-edit.component';
import { GoalListComponent } from './goal-list/goal-list.component';

import { ComponentsGlobalModule } from '../../../components/form-module/components-global.module';

import { FieldControlService } from 'src/app/components/form-module/services/field-control.service';

@NgModule({
  declarations: [
    GoalCreateComponent,
    GoalDetailComponent,
    GoalEditComponent,
    GoalListComponent,
  ],
  exports: [
    GoalCreateComponent,
    GoalDetailComponent,
    GoalEditComponent,
    GoalListComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsGlobalModule,
    RouterModule
  ],
  providers: [FieldControlService]
})
export class ComponentsModule {}
