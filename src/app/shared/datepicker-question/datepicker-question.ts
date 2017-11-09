import { QuestionBase } from '../question-base';

export class DatepickerQuestion extends QuestionBase<string> {
    controlType = 'datepicker';
    hintStart: string;
    hintEnd: string;
    maxDate: Date;
    minDate: Date;

    constructor(options: {} = {}) {
        super(options);
        this.hintStart = options['hintStart'] || '';
        this.hintEnd = options['hintEnd'] || '';
        this.maxDate = options['maxDate'] || null;
        this.minDate = options['minDate'] || null;
    }
}
