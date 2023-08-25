import { Pipe, PipeTransform } from '@angular/core';
export const FORMAT_DATE = "LL";
import * as moment from 'moment';
@Pipe({
  name: 'dateTransformToBr'
})
export class DateTransformPipe implements PipeTransform {

  transform(date: string): string {

    const dia = date.split('-')[2];
    const mes = date.split('-')[1];
    const ano = date.split('-')[0];

    const dateBr = `${dia}/${mes}/${ano}`;

    return dateBr;
  }
}
@Pipe({
  name: 'dateMoment'
})
export class dateMomentTransformPipe implements PipeTransform {

  transform(date: string): string {
    let dt;
    if(!!date){
      dt = moment(date).format(FORMAT_DATE);
    }else{
      dt = 'Data não informada'
    }
     
    return dt;
  }
}