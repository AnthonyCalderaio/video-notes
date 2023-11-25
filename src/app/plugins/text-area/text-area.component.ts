import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TimeSignatureObject } from 'src/app/interfaces/time-signature-object.interface';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css']
})
export class TextAreaComponent {

  @Input('selectedSignatureObject') selectedSignatureObject: any;
  @Input('notesArray') notesArray: TimeSignatureObject[] = [];
  @Input() currentTime?: any;
  @Output() changeSelectedTime = new EventEmitter();
  @Output() updateCurrentTimeEmit = new EventEmitter();
  @Output() updateCurrentText = new EventEmitter();

  timeSignatureArray: TimeSignatureObject[] = [];

  page = 0;

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && !changes['selectedSignatureObject']) {
      this.updateCurrentTimeEmit.emit(this.currentTime | 0);
      }
  }

  handleChangedText(event: any){
    this.updateCurrentText.emit(event?.target?.value || '')
  }

  noteExists() {
    return typeof this.selectedSignatureObject?.notes === 'string';
  }

  selectTime(selectedTimeObject: any) {
    this.changeSelectedTime.emit(selectedTimeObject);
  }

}
