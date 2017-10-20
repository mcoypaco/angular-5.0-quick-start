import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmedPasswordFormComponent } from './confirmed-password-form.component';

describe('ConfirmedPasswordFormComponent', () => {
  let component: ConfirmedPasswordFormComponent;
  let fixture: ComponentFixture<ConfirmedPasswordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmedPasswordFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmedPasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
