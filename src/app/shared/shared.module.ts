import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule } from '@angular/material';

import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';
import { QuestionControlService } from './question-control.service';
import { TextboxQuestionComponent } from './textbox-question/textbox-question.component';
import { PasswordQuestionComponent } from './password-question/password-question.component';
import { InputErrorComponent } from './input-error/input-error.component';

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
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    DynamicFormQuestionComponent,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule, 
    MatFormFieldModule, 
    MatIconModule,
    MatInputModule,
    MatListModule,
    ReactiveFormsModule,
  ],
  declarations: [DynamicFormQuestionComponent, TextboxQuestionComponent, PasswordQuestionComponent, InputErrorComponent],
  providers: [QuestionControlService]
})
export class SharedModule { }
