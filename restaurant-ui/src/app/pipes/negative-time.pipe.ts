import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'negativeTime'
})
export class NegativeTimePipe implements PipeTransform {

  transform(value: number): string {
    const minutes = Math.floor((Math.abs(value) % 3600000) / 60000);
    const seconds = Math.floor((Math.abs(value) % 60000) / 1000);

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    const sign = value < 0 ? '-' : '';

    return `${sign}${formattedMinutes}:${formattedSeconds}`;
  }

}
