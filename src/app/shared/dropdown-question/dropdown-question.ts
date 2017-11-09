import { QuestionBase } from '../question-base';

export class DropdownQuestion extends QuestionBase<string> {
    controlType = 'dropdown';
    options: any[];
    optionLabel: string;

    constructor(options: {} = {}) {
        super(options);
        this.optionLabel = options['optionLabel'] || '';
        this.options = options['options'] || [];
    }
}
