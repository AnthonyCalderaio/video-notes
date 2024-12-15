// notes-limit-dialog.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivationResponse } from 'src/app/interfaces/activation-response.interface';

@Component({
  selector: 'app-notes-limit-dialog',
  templateUrl:'./dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class NotesLimitDialogComponent {
  @Input() currentView: 'limitExceeded' | 'activateForm' = 'limitExceeded'; // Determines the current view
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

  validateKey() {
    (window as any).license.activateKey(this.activationCode).then((activationResponse: ActivationResponse) => {
      console.log(activationResponse)
      if (activationResponse.success) {
        this.closeDialog()
        console.log('License is valid!');
      } else {
        alert('Error validating key:'+activationResponse.message);
      }
    });
  }
}
