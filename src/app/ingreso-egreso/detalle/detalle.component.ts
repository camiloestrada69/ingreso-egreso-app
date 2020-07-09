import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import * as actionsIngresoEgreso from '../ingreso-egreso-actions';
import { IngresoEgreso } from '../../modelos/ingreso-egreso';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWithIngreso } from '../ingreso-egreso-reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  ingresosEgresos: IngresoEgreso [];

  constructor(private store: Store<AppStateWithIngreso>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresosEgresos')
    .subscribe(({items}) => {
      this.ingresosEgresos = items;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  borrarItem(item) {
    this.ingresoEgresoService.borrarIngresoEgreso(item.uid)
    .then( result  => Swal.fire('Borrado', 'Item borrado', 'success'))
    .catch( error => Swal.fire('Error', error, 'error'));
  }

}
