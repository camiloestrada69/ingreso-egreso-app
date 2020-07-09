import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../../modelos/ingreso-egreso';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { AppStateWithIngreso } from '../ingreso-egreso-reducer';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit {
  contadorIngresos = 0;
  contadorEgresos = 0;

  totalIngresos = 0;
  totalEgresos = 0;

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
    public doughnutChartData: MultiDataSet = [[]];

  constructor(private store: Store<AppStateWithIngreso>) {
  }

  ngOnInit() {
    this.store.select('ingresosEgresos')
    .subscribe( ({items}) => this.generarEstadistica(items));
  }

  generarEstadistica(items: IngresoEgreso[]) {
    items.forEach(item => {
      if (item.tipo === 'ingreso') {
        this.contadorIngresos++;
        this.totalIngresos = this.totalIngresos + item.monto;
      } else {
        this.contadorEgresos++;
        this.totalEgresos = this.totalEgresos + item.monto;
      }
    });
    this.doughnutChartData = [[this.totalIngresos, this.totalEgresos]];
  }

}
