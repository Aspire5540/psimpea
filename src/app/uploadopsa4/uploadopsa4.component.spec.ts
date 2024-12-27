import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Uploadopsa4Component } from './uploadopsa4.component';

describe('Uploadopsa4Component', () => {
  let component: Uploadopsa4Component;
  let fixture: ComponentFixture<Uploadopsa4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Uploadopsa4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Uploadopsa4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
