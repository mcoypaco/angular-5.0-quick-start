import { Observable } from 'rxjs/Observable';

export class QuestionBase<T> {
    value: T;
    key: string;
    label: string;
    formArray: boolean;
    required: boolean;
    validators: any[];
    validationMessages: object;
    errorMessage: string;
    customError: string;
    showCustomError: boolean;
    order: number;
    controlType: string;

    /**
     * Textbox question
     */
    prefix?: string;
    suffix?: string;
    type?: string;
    suffixIcon?: string;
    hintStart?: string;
    hintEnd?: string;

    /**
     * Dropdown and radio group
     */
    options?: any[];
    optionLabel?: string;

    /**
     * Radio group
     */
    layout?: string;
    align?: string;
    gap?: any;
    flex?: number;
    color?: string;

    /**
     * Autocomplete
     */
    autoCompleteItems?: any[];

    /**
     * Datepicker
     */
    maxDate?: Date;
    minDate?: Date;

    /**
     * Ticker
     */
    min?: number;
    max?: number;
    step?: number;

    /**
     * Array 
     */
    questions?: [QuestionBase<any>[]];

    constructor(options: {
        value?: T,
        key?: string,
        label?: string,
        formArray?: boolean,
        optionLabel?: string,
        required?: boolean,
        validators?: any[],
        validationMessages?: object,
        errorMessage?: string,
        customError?: string,
        order?: number,
      } = {}) {
      this.value = options.value;
      this.key = options.key || '';
      this.label = options.label || '';
      this.formArray = options.formArray || false;
      this.required = options.required ? true : false;
      this.validators = options.validators;
      this.validationMessages = options.validationMessages;
      this.errorMessage = options.errorMessage;
      this.customError = options.customError;
      this.showCustomError = false;
      this.order = options.order === undefined ? 1 : options.order;
    }
}
