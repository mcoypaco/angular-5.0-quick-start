import { QuestionBase } from '../question-base';

export class RadioGroupQuestion extends QuestionBase<string> {
    controlType = 'radio-group';
    options: any[];
    optionLabel: string;
    layout: string;
    align: string;
    gap: any;
    flex: number;
    color: string;

    constructor(options: {} = {}) {
        super(options);
        this.options = options['options'] || [];
        this.optionLabel = options['optionLabel'] || '';
        this.layout = options['layout'] || '';
        this.align = options['align'] || '';
        this.gap = options['gap'] || '0px';
        this.flex = options['flex'] || 100;
        this.color = options['color'] || 'accent';
    }
}
