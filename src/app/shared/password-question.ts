import { QuestionBase } from './question-base';

export class PasswordQuestion extends QuestionBase<string> {
    controlType = 'password';

    constructor(options: {} = {}) {
        super(options);
    }
}
