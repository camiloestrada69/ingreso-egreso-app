import { Injectable } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Usuario } from '../modelos/usuario';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  subscriptions: Subscription;

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore,
              private store: Store<AppState>) { }

  initAuthListener() {
    this.auth.authState.subscribe( user => {
      if (user) {
        this.subscriptions = this.firestore.doc(`${user.uid}/usuario`).valueChanges()
        .subscribe( (firestoreUser: any) => {
          const tempUser = new Usuario();
          tempUser.uid = firestoreUser.uid;
          tempUser.nombre = firestoreUser.nombre;
          tempUser.email = firestoreUser.email;
          this.store.dispatch(authActions.setUser( {user: tempUser}  ));
        });
      } else {
        this.subscriptions.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
      }
    });
  }

  crearUsuario( nombre: string, email: string, password: string ) {

    // console.log({ nombre, email, password });
     return this.auth.auth.createUserWithEmailAndPassword( email, password )
            .then( ({ user }) => {
               this.firestore.doc(`${ user.uid }/usuario`).set({
                uid: user.uid,
                nombre: nombre,
                email: user.email,
              }).then(result => {
                console.log('entro ' + result );
              }).catch(error => console.error(error));
            });

  }
  ingresar(email, password) {
    return this.auth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.auth.signOut();
  }

  isAuth(): Observable<boolean> {
     return this.auth.authState.pipe(
      map(fbUser => fbUser != null)
    );
  }


}

