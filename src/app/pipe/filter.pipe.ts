import { Pipe, PipeTransform } from '@angular/core';
import {ICompany} from '../app.component';

@Pipe({
  name: 'filterPipe',
  pure: false
})

export class FilterPipe implements PipeTransform {
  transform(items: ICompany[], filter: string): any {

    if (!items || !filter) {
      return items;
    }

    return items.filter(item => item.companyName.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1);
  }
}
