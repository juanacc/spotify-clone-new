import { Pipe, PipeTransform } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';

@Pipe({
  name: 'orderList'
})
export class OrderListPipe implements PipeTransform {

  transform(value: TrackModel[], args: string | null = null, sort: string = 'asc'): TrackModel[] {
    console.log('value', value);
    console.log('args', args);
    console.log('sort', sort);
    try {
      if(args === null)
        return value;
      else{
        const tmpList = value.sort(function (a, b) {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        return (sort === 'asc') ? tmpList : tmpList.reverse();
      }
    } catch (error) {
      console.log('Hubo un error');
      return value;
    }
    return value;
  }

}
