import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { DynamicFormFieldComponent } from './dynamic-form-field/dynamic-form-field.component';

@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicFormFieldComponent,
  ],
  exports: [
    DynamicFormComponent,
    DynamicFormFieldComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ComponentsGlobalModule {}
