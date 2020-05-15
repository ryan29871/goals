import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { FieldControlService } from '../services/field-control.service';

import { FieldBase } from '../classes/field-base';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [FieldControlService]
})
export class DynamicFormComponent implements OnInit {

  @Input() fields: FieldBase<any>[] = [];
  @Output() submit: EventEmitter<any>;

  form: FormGroup;
  submitAttempt: boolean;

  get isValid() {
    if (this.form.valid) {
      return true;
    }
    return false;
  }

  constructor(
    private formBuilder: FormBuilder,
    private fieldControlService: FieldControlService,
  ) {
    console.log('Dynamic Form Component');
    this.submitAttempt = false;
    this.submit = new EventEmitter<any>();
  }

  ngOnInit() {
    this.form = this.fieldControlService.toFormGroup(this.fields);
    this.setInitialValues();
  }

  onReset() {
    this.submitAttempt = false;
    this.setInitialValues();
    this.form.markAsPristine();
  }

  onSubmit() {
    console.log(this.form.value);
    this.submitAttempt = true;
    if (!this.isValid) {
      return;
    }
    this.submit.next(this.form.value);
  }

  setInitialValues() {
    this.fields.forEach(field => {
      this.form.get(field.key).setValue(field.initialValue);
    });
  }

}
