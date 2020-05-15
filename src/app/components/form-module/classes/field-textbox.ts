import { FieldBase } from './field-base';

export class TextboxField extends FieldBase<string> {

  controlType = 'textbox';
  type: string;
  eye: boolean;
  placeHolder: string;
  isCurrency: boolean;
  maxLength: number;
  minLength: number;
  nameMatch: boolean;
  emailValidator: boolean;
  passwordVerify: boolean;

  constructor(options: {} = {}) {
    super(options);
    this.type = options['type'] || '';
    this.eye = options['eye'] || false;
    this.nameMatch = options['nameMatch'] || false;
    this.emailValidator = options['emailValidator'] || false;
    this.placeHolder = options['placeHolder'] || '';
    this.isCurrency = options['isCurrency'] || false;
    this.maxLength = options['maxLength'];
    this.minLength = options['minLength'];
    this.passwordVerify = options['passwordVerify'] || false;
  }

}
