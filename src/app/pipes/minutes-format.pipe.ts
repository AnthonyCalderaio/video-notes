import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesFormat'
})
export class MinutesFormatPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): any {
    let totalSeconds: number = Number(value);
    let minutes: number;
    let secondsRemainder: any;

    minutes = totalSeconds > 59 ? Math.floor(totalSeconds / 60) : 0;
    secondsRemainder = totalSeconds % 60;

    if(secondsRemainder < 10){
        secondsRemainder = '0' + secondsRemainder
    }
    
    let formattedTime = minutes ?  `${minutes}:${secondsRemainder}` : `0:${secondsRemainder}`
    return formattedTime;
  }

}
