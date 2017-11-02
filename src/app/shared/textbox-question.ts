import { QuestionBase } from './question-base';

export class TextboxQuestion extends QuestionBase<string> {
    controlType = 'text';
    prefix: string;
    suffix: string;
    type: string;
    suffixIcon: string;
    hintStart: string;
    hintEnd: string;

    constructor(options: {} = {}) {
        super(options);
        this.prefix = options['prefix'] || '';
        this.suffix = options['suffix'] || '';
        this.type = options['type'] || '';
        this.suffixIcon = options['suffixIcon'] || '';
        this.hintStart = options['hintStart'] || '';
        this.hintEnd = options['hintEnd'] || '';
    }
}
