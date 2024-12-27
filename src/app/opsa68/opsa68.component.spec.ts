import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OPSA68Component } from './opsa68.component';

describe('OPSAComponent', () => {
  let component: OPSA68Component;
  let fixture: ComponentFixture<OPSA68Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OPSA68Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OPSA68Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
