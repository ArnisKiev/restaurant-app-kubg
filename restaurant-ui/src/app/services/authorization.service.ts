import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ApplicationStateService } from './application-state.service';
import { Role, User } from '../interfaces/user';
import { NavigationStart, Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(
    private userService: UserService,
    private applicationStateService: ApplicationStateService,
    private router: Router
  ) { }


  
  public authorize(code: string, tapEffect: () => void) {
    this.userService.getUserByCode(code)
    .pipe(tap(() => tapEffect()))
    .subscribe((user: User) => {
      if (user) {
        this.applicationStateService.user = user;

        switch(user?.role) {
          case Role.ADMIN: 
          this.router.navigate(['/admin']);
          break;
        
          case Role.COOK:
          this.router.navigate(['/cook']);
          break;

          case Role.WAITER:
          this.router.navigate(['/waiter']);
          break;
        }

        localStorage.setItem(user.role.toString(), JSON.stringify(user))
      }
    })
  }

  public startRoutingRedirects() {
    this.applicationStateService.user = JSON.parse(sessionStorage.getItem('user'))
    this.router.events.subscribe(event => {

     if (event instanceof NavigationStart) {
      
      switch(event.url) {
        case '/admin': 
        this.applicationStateService.user = JSON.parse(localStorage.getItem(Role.ADMIN))
        break;
        case '/cook':
          this.applicationStateService.user = JSON.parse(localStorage.getItem(Role.COOK))
        break;
        case '/waiter':
          this.applicationStateService.user = JSON.parse(localStorage.getItem(Role.WAITER))
        break;
      }

      console.log(this.applicationStateService.user)

      //   const currentUser = this.applicationStateService.user;

      //   if (event.url === '/sign-in') {
      //     this.applicationStateService.user = null;
      //     return;
      //   }

      //   if (!currentUser) {
      //     this.router.navigate(['/sign-in'])
      //   }

      //   switch (currentUser?.role) {
      //     case Role.ADMIN: 
      //     event.url !== '/admin' ? this.router.navigate(['/admin']) : null;
      //     break;
        
      //     case Role.COOK:
      //     event.url !== '/cook' ? this.router.navigate(['/cook']) : null;
      //     break;

      //     case Role.WAITER:
      //     event.url !== '/waiter' ? this.router.navigate(['/waiter']) : null;
      //     break;
      //   }
       }
    })
  }


}