import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TickerQuestionComponent } from './ticker-question.component';

describe('TickerQuestionComponent', () => {
  let component: TickerQuestionComponent;
  let fixture: ComponentFixture<TickerQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TickerQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
