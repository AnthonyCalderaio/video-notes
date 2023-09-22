import { Component, Input } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css']
})
export class TextAreaComponent {

  @Input('selectedSignatureObject') selectedSignatureObject: any = {};
  @Input('notesArray') notesArray: any;
  timeSignatureArray: any[] = [];

  ngOnInit(): void {
    console.log('this.noteExists()');
    console.log(this.noteExists())

    // console.log('notesTimesList:');
    // this.timeSignatureArray = Object.keys(this.notesObject).map(timeSignature => {
    //   console.log(timeSignature)
    //   return timeSignature;
    // })
    // interval(1000).subscribe(
    //   res => console.log(this.timeSignatureArray)
    // )
    // interval(1000).subscribe(res => console.log(this.notesArray))
  }



  noteExists() {
    // console.log('this.selectedSignature.note:')
    // console.log(this.selectedSignature.note)
    return typeof this.selectedSignatureObject?.notes === 'string';
  }

}
