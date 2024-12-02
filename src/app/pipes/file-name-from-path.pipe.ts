import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileNameFromPath'
})
export class FileNameFromPathPipe implements PipeTransform {
  // Extracts the file name from a path
  transform(value: string): any {
    const regex = /[^/]+$/;
    let matchResult = value.match(regex)
    if (matchResult) {
      return matchResult[0];
    } else {
      return null;
    }
  }
}
