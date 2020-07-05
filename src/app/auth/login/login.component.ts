import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as ui from '../../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  cargando: boolean;
  uiSubscription: Subscription;
  constructor(private formBuilder: FormBuilder, private auth: AuthService,
              public router: Router, private store: Store<AppState>) {
    this.loginForm = this.formBuilder.group({
      correo: [],
      password: []
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

  ingresar() {
    if (this.loginForm.invalid) { return; }
    this.store.dispatch(ui.isLoading());
    // Swal.fire({
    //   title: 'Espere un momento por favor...',
    //   onBeforeOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    const  {correo, password} = this.loginForm.value;
    this.auth.ingresar(correo, password)
      .then(credenciales => {
          //Swal.close();
          this.store.dispatch(ui.stopLoading());
          this.router.navigate(['/']);
      })
      .catch(error => console.error(error));
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: error.message
        // }));
  }
}
