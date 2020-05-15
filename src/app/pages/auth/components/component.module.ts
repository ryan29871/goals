import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

import { ComponentsGlobalModule } from '../../../components/form-module/components-global.module';

import { FieldControlService } from 'src/app/components/form-module/services/field-control.service';

@NgModule({
  declarations: [
    SignInComponent,
    SignUpComponent,
  ],
  exports: [
    SignInComponent,
    SignUpComponent,
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
