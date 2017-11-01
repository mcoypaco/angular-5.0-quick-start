import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioGroupQuestionComponent } from './radio-group-question.component';

describe('RadioGroupQuestionComponent', () => {
  let component: RadioGroupQuestionComponent;
  let fixture: ComponentFixture<RadioGroupQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadioGroupQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioGroupQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
