import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextboxQuestionComponent } from './textbox-question.component';

describe('TextboxQuestionComponent', () => {
  let component: TextboxQuestionComponent;
  let fixture: ComponentFixture<TextboxQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextboxQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextboxQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
