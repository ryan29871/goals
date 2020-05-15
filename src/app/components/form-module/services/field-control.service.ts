import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

import { FieldBase } from '../classes/field-base';

import { NameValidator } from '../ultilities/name';

@Injectable()
export class FieldControlService {

  constructor() { }

  toFormGroup(fields: FieldBase<any>[]) {
    const group: any = {};

    fields.forEach(field => {
      group[field.key] = field.required ? new FormControl(field.value || null, Validators.compose([Validators.required]))
        : new FormControl(field.value || null);
      if (field['maxLength']) {
        group[field.key].setValidators(Validators.compose([group[field.key].validator, Validators.maxLength(field['maxLength'])]));
      }
      if (field['pattern']) {
        group[field.key].setValidators(Validators.compose([group[field.key].validator, Validators.pattern('pattern')]));
      }
      if (field['minLength']) {
        group[field.key].setValidators(Validators.compose([group[field.key].validator, Validators.minLength(field['minLength'])]));
      }
      if (field['emailValidator']) {
        group[field.key].setValidators(Validators.compose([group[field.key].validator, Validators.email]));
      }
      if (field['passwordVerify']) {
        group[field.key].setValidators(Validators.compose([group[field.key].validator, this.passwordVerify()]));
      }
      if (field['nameMatch']) {
        group[field.key].setAsyncValidators(NameValidator.checkName);
      }
    });

    return new FormGroup(group);
  }

  isBoolean(key, property) {
    for (const iterator of property) {
      const element = property[iterator];
      if (element.key === key) {
        return element.type === 'boolean';
      }
    }
  }

  isNumber(key, property) {
    for (const iterator of property) {
      const element = property[iterator];
      if (element.key === key) {
        return element.type === 'number';
      }
    }
  }

  isString(key, property) {
    for (const iterator of property) {
      const element = property[iterator];
      if (element.key === key) {
        return element.type === 'string';
      }
    }
  }

  private passwordVerify() {
    // private passwordVerify(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const verifyPassword = control.value;
      if (verifyPassword) {
        const newPassword = control.root.get('password').value;
        if (verifyPassword !== newPassword) {
          return {
            passwordMatchInvalid: true
          };
        }
      }
      return null;
    };
  }

}
