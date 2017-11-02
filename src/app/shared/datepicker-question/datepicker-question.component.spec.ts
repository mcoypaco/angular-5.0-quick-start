import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerQuestionComponent } from './datepicker-question.component';

describe('DatepickerQuestionComponent', () => {
  let component: DatepickerQuestionComponent;
  let fixture: ComponentFixture<DatepickerQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
