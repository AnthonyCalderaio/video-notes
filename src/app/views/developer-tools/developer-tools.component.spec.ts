import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperToolsComponent } from './developer-tools.component';

describe('DeveloperToolsComponent', () => {
  let component: DeveloperToolsComponent;
  let fixture: ComponentFixture<DeveloperToolsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeveloperToolsComponent]
    });
    fixture = TestBed.createComponent(DeveloperToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
