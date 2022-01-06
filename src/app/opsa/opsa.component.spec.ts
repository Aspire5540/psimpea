import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OPSAComponent } from './opsa.component';

describe('OPSAComponent', () => {
  let component: OPSAComponent;
  let fixture: ComponentFixture<OPSAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OPSAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OPSAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
