import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css']
})
export class TextAreaComponent {

  @Input('selectedSignature') selectedSignature:any =  {};

  ngOnInit(): void { }

}
