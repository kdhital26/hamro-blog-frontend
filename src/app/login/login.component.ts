import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, pipe, Subject, takeUntil } from 'rxjs';
import { User } from '../shared/model/user.model';
import { LoginService, } from '../shared/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isRightPanelActive = false;
  user = new User();
  destryoed$ = new Subject<boolean>();
  message = '';
  userName = '';
  errorMessage: string = '';
  setDanger: boolean = false;
  constructor(
    private userService: LoginService,
    private router: Router
  ) {
    this.userService.loggedInUser$.next({});
    sessionStorage.removeItem("loggedInUser");
   }

  togglePanel(isSignUp?: boolean) {
    this.isRightPanelActive = !this.isRightPanelActive;
    if(isSignUp) {
      this.user = new User();
    }
  }

  login() {
    this.userService.login(this.user)
    .subscribe ((result: any) => {
      if(result) {
        this.errorMessage = '';
        const { body: {user} } = result;
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        this.userService.loggedInUser$.next(user);
        this.router.navigateByUrl('/home');
        this.setTimeoutFnc();

      }
    }, error => {
      this.errorMessage =  error?.error?.message;
      this.setTimeoutFnc();

    })
    
  }

  signUp() {
    if(!this.isAllFiledhasValue()) {
      this.userService.signUp(this.user)
      .pipe(takeUntil(this.destryoed$))
      .subscribe(result => {
        console.log(result);
        const {user :{firstName, lastName ,...rest}}: any = result?.body;
        this.togglePanel(this.userName ? true : false);
        this.userName = firstName;
        this.setTimeoutFnc();
        this.message = 'Congratulations! you are registered as a new user, Please login to Proceed.'
      }, error =>{
        this.errorMessage =  error?.error?.message;
        this.setTimeoutFnc();
      });
    }
    
  }

  isAllFiledhasValue() {
    if(!this.user.email || !this.user.firstName || !this.user.lastName || !this.user.password) {
      this.setDanger = true;
    } else {
      this.setDanger = false;
    }
    return this.setDanger;
  }

  setTimeoutFnc() {
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000);
  }
}
