import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgreso } from '../modelos/ingreso-egreso';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as uiActions from '../../app/shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoForm: FormGroup;
  uiSubscription: Subscription;
  tipo = 'ingreso';
  cargando: boolean;

  constructor(public formBuilder: FormBuilder, private ingresoEgresoService: IngresoEgresoService,
              private store: Store<AppState>) {
    this.ingresoForm = this.formBuilder.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    });
    this.uiSubscription = this.store.select('ui').subscribe( ui => {
      this.cargando = ui.isLoading;
    });
  }
  ngOnInit() {

  }
  ngOnDestroy() {
    this.uiSubscription.unsubscribe();
  }
  guardar() {
    if (this.ingresoForm.invalid) { return; }

    this.store.dispatch(uiActions.isLoading());

    const ingresoEgreso = new IngresoEgreso();
    ingresoEgreso.monto = this.ingresoForm.value.monto;
    ingresoEgreso.descripcion = this.ingresoForm.value.descripcion;
    ingresoEgreso.tipo = this.tipo;

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
    .then( respuesta => {
      this.store.dispatch(uiActions.stopLoading());
      Swal.fire('Registro creado', ingresoEgreso.descripcion, 'success');
      this.ingresoForm.reset();
    })
    .catch(error => {
      this.store.dispatch(uiActions.stopLoading());
      Swal.fire('Advertencia', error, 'error');
    });
  }
}
