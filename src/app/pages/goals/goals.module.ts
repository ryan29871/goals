import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoalsPageRoutingModule } from './goals-routing.module';
import { ComponentsModule } from './components/component.module';

import { GoalsPage } from './goals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    GoalsPageRoutingModule
  ],
  declarations: [GoalsPage]
})
export class GoalsPageModule {}
