import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSignatureComponent } from './time-signature.component';

describe('TimeSignatureComponent', () => {
  let component: TimeSignatureComponent;
  let fixture: ComponentFixture<TimeSignatureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeSignatureComponent]
    });
    fixture = TestBed.createComponent(TimeSignatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
