import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { TimeSignatureObject } from 'src/app/interfaces/time-signature-object.interface';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css']
})
export class TextAreaComponent {

  @Input('selectedSignatureObject') selectedSignatureObject: any;
  @Input('notesArray') notesArray: TimeSignatureObject[] = [];
  @Output() updateCurrentTimeEmit = new EventEmitter();
  @Output() updateCurrentText = new EventEmitter();
  @Output() changeSelectedTime = new EventEmitter();
  @Input() currentTime?: any;
  @Input() api?: any;

  timeSignatureArray: TimeSignatureObject[] = [];

  page = 0;

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && !changes['selectedSignatureObject']) {
      // Handle ticks
      this.updateCurrentTimeEmit.emit(this.currentTime | 0);
      this.handleChangedText(this.selectedSignatureObject.notes)
    }
  }

  handleChangedText(event: any) {
    this.updateCurrentText.emit(event?.target?.value || '')
  }

  noteExists() {
    return typeof this.selectedSignatureObject?.notes === 'string';
  }

  selectTime(selectedTimeObject: any) {
    this.changeSelectedTime.emit(selectedTimeObject);
  }

  focusTextArea() {
    if (this.api.state === 'playing') {
      this.api.pause();
    }
  }

}
