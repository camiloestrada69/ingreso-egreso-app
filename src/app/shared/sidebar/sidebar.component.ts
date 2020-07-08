import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Usuario } from '../../modelos/usuario';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  user: Usuario;
  constructor(private authService: AuthService, public router: Router,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('user').subscribe(({user}) => {
      this.user = new Usuario();
      this.user = user;
    });
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout() {
    this.authService.logout().then( () => this.router.navigate(['/login']));
  }
}
