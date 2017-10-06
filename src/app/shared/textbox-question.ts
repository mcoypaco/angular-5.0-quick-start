import { QuestionBase } from './question-base';

export class TextboxQuestion extends QuestionBase<string> {
    controlType = 'text';
    type: string;
    suffixIcon: string;

    constructor(options: {} = {}) {
        super(options);
        this.type = options['type'] || '';
        this.suffixIcon = options['suffixIcon'] || null;
    }
}
