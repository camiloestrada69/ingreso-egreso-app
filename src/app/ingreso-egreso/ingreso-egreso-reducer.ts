import { createReducer, on } from '@ngrx/store';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso-actions';
import { IngresoEgreso } from '../modelos/ingreso-egreso';

export interface State {
    items: IngresoEgreso[];
}

export const initialState: State = {
  items: []
};


const _ingresoEgresoReducer = createReducer(initialState,

    on(ingresoEgresoActions.setItems, (state, {items}) => ({ ...state, items: [...items] })),
    on(ingresoEgresoActions.unSetItems, state => ({ ...state, items: [] })),

);

export function ingresoEgresoReducer(state, action) {
    return _ingresoEgresoReducer(state, action);
}
