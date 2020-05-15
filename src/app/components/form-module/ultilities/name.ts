import { FormControl } from '@angular/forms';

export class NameValidator {

  static checkName(control: FormControl): any {

    return new Promise(resolve => {

      // Fake a slow response from server
      // Don't let this happen until typeing completes

      setTimeout(() => {
        console.log(control.value.toLowerCase());
        if (control.value.toLowerCase() === 'just a test') {
          resolve({
            'username taken': true
          });
        } else {
          resolve(null);
        }
      }, 2000);

    });

  }

}
