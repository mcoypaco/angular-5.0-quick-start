import { QuestionBase } from './question-base';

export class CheckboxQuestion extends QuestionBase<string> {
    controlType = 'checkbox';
    color: string;

    constructor(options: {} = {}) {
        super(options);
        this.color = options['color'] || 'accent';
    }

}
