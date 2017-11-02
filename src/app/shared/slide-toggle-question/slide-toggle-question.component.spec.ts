import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideToggleQuestionComponent } from './slide-toggle-question.component';

describe('SlideToggleQuestionComponent', () => {
  let component: SlideToggleQuestionComponent;
  let fixture: ComponentFixture<SlideToggleQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideToggleQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideToggleQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
