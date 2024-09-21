import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/shared/model/user.model';
import { LoginService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, AfterViewInit {
@Output() closeDialog = new EventEmitter<any>();
user = new User();
errorMessage = '';
destryoed$ = new Subject<boolean>();
message = '';
setDanger: boolean = false;

showBtnLoader = false;
  constructor(
    private modalService: BsModalService,
    private bsModalRef: BsModalRef,
    private userService: LoginService
  ) { 
    
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const { config }: any  = this.modalService;
    console.log(config, this.bsModalRef, 'config')
  }

  submit() {
    this.setTimeoutFnc();
    this.signUp();
  }

  signUp() {
    if(!this.isAllFiledhasValue()) {
      this.showBtnLoader = true;
      this.userService.signUp(this.user)
      .pipe(takeUntil(this.destryoed$))
      .subscribe((result : any) => {
        this.showBtnLoader = false;
        this.loginForbookmark();
        const {user :{firstName, lastName ,...rest}}: any = result?.body;
      }, (error: any) => {
        this.showBtnLoader = false;
        this.errorMessage =  error?.error?.message;
      });
    }    
  }
  loginForbookmark() {
    this.user.firstName = undefined;
    this.user.lastName = undefined;
    this.userService.login(this.user)
    .pipe(takeUntil(this.destryoed$))
    .subscribe((res: any) => {
      const { body: {user} } = res;
      sessionStorage.removeItem('loggedInUser');
      sessionStorage.setItem('loggedInUser', JSON.stringify(user));
      this.userService.loggedInUser$.next(user);
      window.location.reload();
    }, error =>{

    })
  }

  isAllFiledhasValue() {
    if(!this.user.email || !this.user.firstName || !this.user.lastName || !this.user.password) {
      this.setDanger = true;
    } else {
      if(!this.user.email?.includes('@')) {
        this.errorMessage = 'Not a valid Email Address';
        return this.setDanger = true;
      } else {
        this.setDanger = false
      }
    }
    return this.setDanger;
  }

  setTimeoutFnc() {
    setTimeout(() => {
      this.errorMessage = '';
    }, 5000);
  }

  close() {
    this.bsModalRef?.hide();
    this.closeDialog.emit('close');
  }



  

}
