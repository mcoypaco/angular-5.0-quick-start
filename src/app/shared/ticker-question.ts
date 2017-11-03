import { QuestionBase } from './question-base';

export class TickerQuestion extends QuestionBase<string> {
    controlType = 'ticker';
    prefix: string;
    suffix: string;
    suffixIcon: string;
    hintStart: string;
    hintEnd: string;
    min: number;
    max: number;
    step: number;

    constructor(options: {} = {}) {
        super(options);
        this.prefix = options['prefix'] || '';
        this.suffix = options['suffix'] || '';
        this.suffixIcon = options['suffixIcon'] || '';
        this.hintStart = options['hintStart'] || '';
        this.hintEnd = options['hintEnd'] || '';
        this.min = options['min'];
        this.max = options['max'];
        this.step = options['step'];
    }
}
