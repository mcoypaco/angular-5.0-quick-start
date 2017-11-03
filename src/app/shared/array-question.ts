import { QuestionBase } from './question-base';

export class ArrayQuestion extends QuestionBase<string> {
    controlType = 'form-array';
    formArray = true;
    questions: [QuestionBase<any>[]];
    layout: string;
    align: string;
    gap: string;

    constructor(options: {} = {}) {
        super(options);
        this.questions = options['questions'] || [];
        this.layout = options['layout'] || '';
        this.align = options['align'] || '';
        this.gap = options['gap'] || '';
    }
}
