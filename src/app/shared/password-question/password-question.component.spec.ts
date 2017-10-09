import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordQuestionComponent } from './password-question.component';

describe('PasswordQuestionComponent', () => {
  let component: PasswordQuestionComponent;
  let fixture: ComponentFixture<PasswordQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
