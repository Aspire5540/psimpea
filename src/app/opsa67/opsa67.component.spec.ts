import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OPSA67Component } from './opsa67.component';

describe('OPSAComponent', () => {
  let component: OPSA67Component;
  let fixture: ComponentFixture<OPSA67Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OPSA67Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OPSA67Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
