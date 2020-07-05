import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as ui from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {
  registroForm: FormGroup;
  uiSubscription: Subscription;
  cargando: boolean;

  constructor(public formBuilder: FormBuilder, private authService: AuthService,
              public router: Router, private store: Store<AppState>) {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
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

  crearUsuario() {

    if ( this.registroForm.invalid ) { return; }
    this.store.dispatch(ui.isLoading());
    // Swal.fire({
    //   title: 'Espere por favor',
    //   onBeforeOpen: () => {
    //     Swal.showLoading()
    //   }
    // });


    const { nombre, correo, password } = this.registroForm.value;

    this.authService.crearUsuario( nombre, correo, password )
      .then( credenciales => {
        // Swal.close();
        this.store.dispatch(ui.stopLoading());
        this.router.navigate(['/']);
      })
      .catch( error => {
        this.store.dispatch(ui.stopLoading());
      });
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Oops...',
      //     text: err.message
      //   });
      // });
  }

}
