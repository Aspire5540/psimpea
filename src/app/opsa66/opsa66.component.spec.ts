import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OPSA66Component } from './opsa66.component';

describe('OPSAComponent', () => {
  let component: OPSA66Component;
  let fixture: ComponentFixture<OPSA66Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OPSA66Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OPSA66Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
