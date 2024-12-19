import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon } from '../models/pokemon';

@Pipe({
  name: 'getStat'
})
export class GetStatPipe implements PipeTransform {

  transform(value: Pokemon, nameStat: string): number {
    const statPound = value.stats.find( s => s.stat.name === nameStat);
    if (statPound) { 
      return statPound.base_stat;
    }
    return 0;
  }

}
