export class QuestionBase<T> {
    value: T;
    key: string;
    label: string;
    required: boolean;
    validators: any[];
    error: string;
    order: number;
    controlType: string;

    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        required?: boolean,
        validators?: any[],
        error?: string,
        order?: number,
      } = {}) {
      this.value = options.value;
      this.key = options.key || '';
      this.label = options.label || '';
      this.required = options.required ? true : false;
      this.validators = options.validators;
      this.error = options.error;
      this.order = options.order === undefined ? 1 : options.order;
    }
}
