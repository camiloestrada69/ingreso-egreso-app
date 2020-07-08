import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { auth } from 'firebase';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as actionsIgresoEgreso from '../ingreso-egreso/ingreso-egreso-actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  ingresoEgresoSubscription: Subscription;

  constructor(private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.subscription = this.store.select('user')
    .pipe(
      filter( auth => auth.user !== null)
    )
    .subscribe(({user}) => {
      this.ingresoEgresoSubscription = this.ingresoEgresoService.initIngresoEgresoListener(user.uid)
      .subscribe( ingresosEgresos => {
        this.store.dispatch(actionsIgresoEgreso.setItems({items: ingresosEgresos}));
      });
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.ingresoEgresoSubscription) {
      this.subscription.unsubscribe();
    }
  }

}
