import { FieldBase } from './field-base';

export class ToggleField extends FieldBase<string> {

  controlType = 'toggle';
  options: { key: string, value: string }[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }

}
