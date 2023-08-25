import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
// Epochs
const epochs: any = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1]
];

const epochsBr: any = [
  ['ano', 31536000],
  ['mês', 2592000],
  ['dia', 86400],
  ['hora', 3600],
  ['minuto', 60],
  ['segundo', 1]
];

@Pipe({name: 'relativeDate'})
export class RelativeDatePipe implements PipeTransform {
    localePt = false;
    getDuration(timeAgoInSeconds: number) {
        for (let [name, seconds] of (this.localePt ? epochsBr : epochs)) {
            let interval = Math.floor(timeAgoInSeconds / seconds);
            if (interval >= 1) {
                return {
                    interval: interval,
                    epoch: name
                };
            }
        }
        return {
            interval: 0,
            epoch: 'seconds'
        };
    };

    transform(dateStamp: Date, locale: string): string {
        this.localePt = locale == 'pt-br'
        let currentLanguage = locale ?? 'pt-br';
        moment.locale(currentLanguage == 'br' ? 'pt-br' : currentLanguage)
        const end = moment(dateStamp);
        return end.fromNow()
    }

}