import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Uploadopsa3Component } from './uploadopsa3.component';

describe('Uploadopsa3Component', () => {
  let component: Uploadopsa3Component;
  let fixture: ComponentFixture<Uploadopsa3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Uploadopsa3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Uploadopsa3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
