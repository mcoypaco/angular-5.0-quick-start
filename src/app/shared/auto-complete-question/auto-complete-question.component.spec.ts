import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompleteQuestionComponent } from './auto-complete-question.component';

describe('AutoCompleteQuestionComponent', () => {
  let component: AutoCompleteQuestionComponent;
  let fixture: ComponentFixture<AutoCompleteQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoCompleteQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompleteQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
