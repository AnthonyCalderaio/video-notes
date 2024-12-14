import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesLimitDialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: NotesLimitDialogComponent;
  let fixture: ComponentFixture<NotesLimitDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NotesLimitDialogComponent]
    });
    fixture = TestBed.createComponent(NotesLimitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
