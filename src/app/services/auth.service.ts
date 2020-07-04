import { Injectable } from '@angular/core';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Usuario } from '../modelos/usuario';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private firestore: AngularFirestore) { }

  initAuthListener() {
    this.auth.authState.subscribe( user => {
      if (user) {
      }
    });
  }

  crearUsuario( nombre: string, email: string, password: string ) {

    // console.log({ nombre, email, password });
    return this.auth.auth.createUserWithEmailAndPassword( email, password )
            .then( ({ user }) => {

              const newUser = new Usuario( user.uid, nombre, user.email );

              return this.firestore.doc(`${ user.uid }/usuario`).set({
                uid: user.uid,
                nombre: nombre,
                email: user.email,
              });

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
