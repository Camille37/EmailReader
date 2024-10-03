import { Component, OnDestroy, ViewChild } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {

  isLogged : boolean ;
  isError: boolean = false;
  username: string = '';
  password: string= '';

  loginSrv : LoginService;
  private subscription: Subscription = new Subscription();

  constructor(loginSrv : LoginService){
    this.loginSrv = loginSrv;
    this.isLogged = this.loginSrv.isLogged();
  }

  @ViewChild('loginForm') loginForm: any; 

  login(){
    this.subscription.add(
      this.loginSrv.login(this.username, this.password).subscribe({
        next: (user: User) => {
          console.log('Successful login of '+user.username, user);
          this.isError = false;
          this.isLogged = this.loginSrv.isLogged();
          this.loginForm.reset();
        },
        error: (err) => {
          console.error('Login failed', err);
          this.isError = true;
        },
      })
    );
  }

  logout(){
    this.loginSrv.logout();
    this.isLogged = this.loginSrv.isLogged();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
