import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

import { FieldBase } from '../classes/field-base';

@Component({
  selector: 'app-dynamic-form-field',
  templateUrl: './dynamic-form-field.component.html',
  styleUrls: ['./dynamic-form-field.component.scss']
})
export class DynamicFormFieldComponent implements OnInit, OnDestroy {

  @Input() field: FieldBase<any>;
  @Input() form: FormGroup;
  @Input() submitAttempt: FormGroup;

  icon = 'eye-off';

  private valueSubscription: Subscription;

  get errorMessage() {
    const control = this.form.controls[this.field.key];
    for (const key in control.errors) {
      if (control.errors.hasOwnProperty(key)) {
        const element = control.errors[key];
        if (key === 'required') {
          return 'This field is required';
        } else if (key === 'minlength') {
          return 'The min number of characters is ' + control.errors[key].requiredLength;
        } else if (key === 'maxlength') {
          return 'The max number of characters is ' + control.errors[key].requiredLength;
        } else if (key === 'pattern') {
          // return 'The required pattern is: ' + object[key].requiredPattern;
          return 'Only characters A-Z, a-z, 0-9 are acceptable.';
        } else if (key === 'invalidMobile') {
          return 'Not a valid phone number';
        } else if (key === 'passwordMatchInvalid') {
          return 'Passwords do not match';
        } else if (key === 'email') {
          return 'Must be a valid email address';
        } else if (key === 'key exist') {
          return 'Already exist';
        } else {
          return 'Unknown Error';
        }
      }
    }
  }

  get isValid() {
    const control = this.form.controls[this.field.key];
    if (control.invalid && (control.dirty && control.touched || this.submitAttempt)) {
      return false;
    }
    return true;
  }

  get statusMessage() {
    return `Checking server for existing ${this.field.key}...`;
  }

  get debounce() {
    if (this.form.controls[this.field.key].asyncValidator) {
      return 500;
    }
    return 0;
  }

  constructor() {
    console.log('Dynamic Form Field Component');
  }

  hideShow() {
    this.field['type'] = this.field['type'] === 'text' ? 'password' : 'text';
    this.icon = this.icon === 'eye-off' ? 'eye' : 'eye-off';
  }

  ngOnDestroy() {
    if (this.valueSubscription) {
      this.valueSubscription.unsubscribe();
    }
  }

  ngOnInit() {
    if (this.field['eye']) {
      this.field['type'] = 'password';
    }
  }


}
