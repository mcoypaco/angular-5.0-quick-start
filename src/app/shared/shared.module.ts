import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule, MatRadioModule, MatSelectModule, MatSlideToggleModule} from '@angular/material';

import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';
import { QuestionControlService } from './question-control.service';
import { TextboxQuestionComponent } from './textbox-question/textbox-question.component';
import { PasswordQuestionComponent } from './password-question/password-question.component';
import { InputErrorComponent } from './input-error/input-error.component';
import { DropdownQuestionComponent } from './dropdown-question/dropdown-question.component';
import { RadioGroupQuestionComponent } from './radio-group-question/radio-group-question.component';
import { SlideToggleQuestionComponent } from './slide-toggle-question/slide-toggle-question.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule, 
    MatFormFieldModule, 
    MatIconModule,
    MatInputModule,
    MatListModule,
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
    ReactiveFormsModule,
  ],
  declarations: [DynamicFormQuestionComponent, TextboxQuestionComponent, PasswordQuestionComponent, InputErrorComponent, DropdownQuestionComponent, RadioGroupQuestionComponent, SlideToggleQuestionComponent],
  providers: [QuestionControlService]
})
export class SharedModule { }
