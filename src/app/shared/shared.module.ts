import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatNativeDateModule, MatRadioModule, MatSelectModule, MatSlideToggleModule} from '@angular/material';

import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';
import { QuestionControlService } from './question-control.service';
import { TextboxQuestionComponent } from './textbox-question/textbox-question.component';
import { PasswordQuestionComponent } from './password-question/password-question.component';
import { InputErrorComponent } from './input-error/input-error.component';
import { DropdownQuestionComponent } from './dropdown-question/dropdown-question.component';
import { RadioGroupQuestionComponent } from './radio-group-question/radio-group-question.component';
import { SlideToggleQuestionComponent } from './slide-toggle-question/slide-toggle-question.component';
import { CheckboxQuestionComponent } from './checkbox-question/checkbox-question.component';
import { AutoCompleteQuestionComponent } from './auto-complete-question/auto-complete-question.component';
import { DatepickerQuestionComponent } from './datepicker-question/datepicker-question.component';
import { TickerQuestionComponent } from './ticker-question/ticker-question.component';
import { ArrayQuestionComponent } from './array-question/array-question.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MatAutocompleteModule,
    MatButtonModule, 
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule, 
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    DynamicFormQuestionComponent,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    InputErrorComponent,
    MatButtonModule, 
    MatFormFieldModule, 
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  declarations: [DynamicFormQuestionComponent, TextboxQuestionComponent, PasswordQuestionComponent, InputErrorComponent, DropdownQuestionComponent, RadioGroupQuestionComponent, SlideToggleQuestionComponent, CheckboxQuestionComponent, AutoCompleteQuestionComponent, DatepickerQuestionComponent, TickerQuestionComponent, ArrayQuestionComponent],
  providers: [QuestionControlService]
})
export class SharedModule { }
