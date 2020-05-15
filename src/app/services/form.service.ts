import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

    public isString(key, property) {
      for (let index = 0; index < property.length; index++) {
        const element = property[index];
        if (element.key === key) {
          return element.type === 'string';
        }
      }
    }

    public isNumber(key, property) {
      for (let index = 0; index < property.length; index++) {
        const element = property[index];
        if (element.key === key) {
          return element.type === 'number';
        }
      }
    }

    public isBoolean(key, property) {
      for (let index = 0; index < property.length; index++) {
        const element = property[index];
        if (element.key === key) {
          return element.type === 'boolean';
        }
      }
    }

    public valueInvalid(name, control, submitAttempt) {
      if ((!name[control].valid && (name[control].status.toLowerCase() !== 'pending')) && (name[control].dirty || submitAttempt)) {
        return false;
      } else {
        return true;
      }
    }

    public getStatusMessage(item) {
      // if (object.status.toLowerCase() === 'pending') {
        return `Checking server for ${item}...`;
      // }
    }

    public getErrorMessage(object) {
      for (const key in object) {
        // console.log(key);
        if (object.hasOwnProperty(key)) {
          const element = object[key];
          // console.log(element);
          if (key === 'required') {
            return 'This field is required';
          } else if (key === 'minlength') {
            return 'The min number of characters is ' + object[key].requiredLength;
          } else if (key === 'maxlength') {
            return 'The max number of characters is ' + object[key].requiredLength;
          } else if (key === 'pattern') {
            // return 'The required pattern is: ' + object[key].requiredPattern;
            return 'Only characters A-Z, a-z, 0-9 are acceptable.';
          } else if (key === 'invalidMobile') {
            return 'Not a valid phone number';
          } else if (key === 'passwordMatchInvalid') {
            return 'Passwords do not match';
          } else if (key === 'email') {
            return 'Must be a valid email address';
          } else {
            return 'Unknown Error';
          }
        }
      }
    }

  }

