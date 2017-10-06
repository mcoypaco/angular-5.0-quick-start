import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';

import { DynamicFormQuestionComponent } from './dynamic-form-question/dynamic-form-question.component';
import { QuestionControlService } from './question-control.service';
import { TextboxComponent } from './textbox/textbox.component';
import { PasswordComponent } from './password/password.component';

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
    ReactiveFormsModule,
  ],
  declarations: [DynamicFormQuestionComponent, TextboxComponent, PasswordComponent],
  providers: [QuestionControlService]
})
export class SharedModule { }
