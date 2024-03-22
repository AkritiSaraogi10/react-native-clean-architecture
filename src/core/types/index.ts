export class Fields {
  key: string;
  label: string;
  placeholder: string;
  value: string;
  constructor(key: string, label: string, placeholder: string, value: string) {
    this.key = key;
    this.label = label;
    this.placeholder = placeholder;
    this.value = value;
  }

  validate() {}
  transform(format: string) {}
}

export interface IFields {
  key: string;
  label: string;
  placeholder: string;
  value: string;
}
