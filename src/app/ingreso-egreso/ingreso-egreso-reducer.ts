import { createReducer, on } from '@ngrx/store';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso-actions';
import { IngresoEgreso } from '../modelos/ingreso-egreso';
import { AppState } from '../app.reducer';

export interface State {
    items: IngresoEgreso[];
}

export interface AppStateWithIngreso extends AppState {
    ingresosEgresos: State;
}

export const initialState: State = {
  items: []
};


const IngresoEgresoReducer = createReducer(initialState,

    on(ingresoEgresoActions.setItems, (state, {items}) => ({ ...state, items: [...items] })),
    on(ingresoEgresoActions.unSetItems, state => ({ ...state, items: [] })),

);

export function ingresoEgresoReducer(state, action) {
    return IngresoEgresoReducer(state, action);
}
