import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ApplicationStateService {

  public user: User;
  


  constructor() { }
}
