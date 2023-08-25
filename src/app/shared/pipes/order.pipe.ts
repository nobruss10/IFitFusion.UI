import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {

  transform(list: any[], params?: string, asc = true): any[] {

    if (params) {
      return list.sort(( a: any, b: any ) => {
          let v1 = a[ params ];
          let v2 = b[ params ];
          
          if ( v1 == undefined && v2 == undefined ) return 0;
          if ( v1 == undefined && v2 != undefined ) return asc ? -1 : 1;
          if ( v1 != undefined && v2 == undefined ) return asc ? 1 : -1;
          if ( v1 === v2 ) return 0;
          
          return asc ? 
            (v1.toString().toLowerCase() > v2.toString().toLowerCase() ? 1 : -1) : 
            (v2.toString().toLowerCase() > v1.toString().toLowerCase() ? 1 : -1);
      })
    }

    return list;
  }
}