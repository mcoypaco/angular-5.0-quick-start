import { QuestionBase } from './question-base';

export class SlideToggleQuestion extends QuestionBase<string> {
    controlType = 'slide-toggle';
    color: string;

    constructor(options: {} = {}) {
        super(options);
        this.color = options['color'] || 'accent';
    }
}
