import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { QuestionBase } from './question-base';

let optionLabel = null;

export class AutoCompleteQuestion extends QuestionBase<string> {
    controlType = 'auto-complete';
    prefix: string;
    suffix: string;
    suffixIcon: string;
    hintStart: string;
    hintEnd: string;
    autoCompleteItems: any[];
    optionLabel: string;

    constructor(options: {} = {}) {
        super(options);
        this.autoCompleteItems = options['autoCompleteItems'] || [];
        this.optionLabel = options['optionLabel'] || null;
        this.prefix = options['prefix'] || '';
        this.suffix = options['suffix'] || '';
        this.suffixIcon = options['suffixIcon'] || '';
        this.hintStart = options['hintStart'] || '';
        this.hintEnd = options['hintEnd'] || '';

        optionLabel = this.optionLabel;
    }
}
