import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../modelos/ingreso-egreso';

export const setItems = createAction(
    '[IngresoEgreso] setItems',
    props<{ items: IngresoEgreso[] }>()
    );

export const unSetItems = createAction(
    '[IngresoEgreso] unSetItems'
    );

export const borrarItem = createAction(
        '[IngresoEgreso] unSetItems',
        props<{uid: string}>()
    );
