import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Uploadopsa2Component } from './uploadopsa2.component';

describe('Uploadopsa2Component', () => {
  let component: Uploadopsa2Component;
  let fixture: ComponentFixture<Uploadopsa2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Uploadopsa2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Uploadopsa2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
