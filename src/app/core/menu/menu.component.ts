import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { UserService } from 'src/app/components/services/user.service';
import { AppService } from 'src/app/shared/service/app.service';
import { LoginService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  loggedInUserId: string = '';
  userName: boolean = false;
  email: string = ''
  showMenu = false;
  isMenuOpen = false;

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private appService: AppService,
    private userService: LoginService,
  ) {
    this.userService.loggedInUser$.subscribe((result: any) => {
       this.userName = result?.fullName;
       this.email = result?.email;
    });
    if(!this.userName) {
      this.userName = this.appService?.getUserDetails()?.fullName;
      this.email = this.appService?.getUserDetails()?.email;
    }
   }

 

  ngOnInit(): void {
   
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngAfterViewInit(): void {
    
  }
  

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  navigateToContent(type: string) {
    this.cd.detectChanges();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.navigate([`/content`], {queryParams: {type: type}});
    this.router.navigate(['/content'], { queryParams: { type: type } });
  }

  ngOnDestroy(): void {
    this.userService.loggedInUser$.next({});
    this.userService.loggedInUser$.unsubscribe();
  }
}
