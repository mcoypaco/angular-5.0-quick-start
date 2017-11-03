import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayQuestionComponent } from './array-question.component';

describe('ArrayQuestionComponent', () => {
  let component: ArrayQuestionComponent;
  let fixture: ComponentFixture<ArrayQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrayQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
