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
  @Input() currentTime?: any;
  @Output() changeSelectedTime = new EventEmitter();
  @Output() updateCurrentTimeEmit = new EventEmitter();

  timeSignatureArray: TimeSignatureObject[] = [];

  page = 0;

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.updateCurrentTimeEmit.emit(this.currentTime | 0);
      console.log(this.selectedSignatureObject)
    }
  }

  noteExists() {
    return typeof this.selectedSignatureObject?.notes === 'string';
  }

  selectTime(selectedTimeObject: any) {
    this.changeSelectedTime.emit(selectedTimeObject);
  }

}
