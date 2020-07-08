import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../modelos/ingreso-egreso';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenarIngresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return items.sort(( a, b ) => {
      if (a.tipo === 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    });

  }
}
