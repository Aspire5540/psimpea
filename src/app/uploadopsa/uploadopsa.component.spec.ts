import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadopsaComponent } from './uploadopsa.component';

describe('UploadopsaComponent', () => {
  let component: UploadopsaComponent;
  let fixture: ComponentFixture<UploadopsaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadopsaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadopsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
