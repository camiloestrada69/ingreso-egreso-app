import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private auth: AuthService,
              public router: Router) {
    this.loginForm = this.formBuilder.group({
      correo: [],
      password: []
    });
  }

  ngOnInit() {
  }

  ingresar() {
    if (this.loginForm.invalid) { return; }

    Swal.fire({
      title: 'Espere un momento por favor...',
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    const  {correo, password} = this.loginForm.value;
    this.auth.ingresar(correo, password)
      .then(credenciales => {
          Swal.close();
          this.router.navigate(['/']);
      })
      .catch(error =>
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.message
        }));
  }
}
