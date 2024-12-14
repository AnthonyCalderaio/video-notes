// notes-limit-dialog.component.ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-notes-limit-dialog',
  templateUrl:'./dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class NotesLimitDialogComponent {
  @Output() dialogOpen = new EventEmitter();
  isDialogVisible: boolean = true;
  showActivateForm: boolean = false;
  activationCode: string = '';
  activationError: string | null = null;

  closeDialog() {
    this.isDialogVisible = false;
    this.dialogOpen.emit(false);
  }

  redirectToBuy() {
    window.open('https://your-site.com/upgrade', '_blank');
  }

  openActivateForm() {
    this.showActivateForm = true;
  }

  activateCode() {
    if (this.activationCode === 'VALID_CODE') {
      alert('Activation successful!'); // Replace with real activation logic
      this.closeDialog();
    } else {
      this.activationError = 'Invalid activation code. Please try again.';
    }
  }
}
