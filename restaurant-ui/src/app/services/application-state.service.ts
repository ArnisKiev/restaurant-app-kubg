import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStateService {

  public user: User;
  

  get userFromStorage() {
    return JSON.parse(sessionStorage.getItem('user'));
  }

  constructor() { }
}
