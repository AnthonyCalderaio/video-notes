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
  @Output() changeSelectedTime = new EventEmitter();

  timeSignatureArray: TimeSignatureObject[] = [];

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    
  }

  noteExists() {
    return typeof this.selectedSignatureObject?.notes === 'string';
  }

  selectTime(selectedTimeObject:any){
    this.changeSelectedTime.emit(selectedTimeObject);
  }

}
