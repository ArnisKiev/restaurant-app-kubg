import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Observable, Subject, tap } from 'rxjs';
import { ApiService } from './api.service';
import { serverEndPoint } from '../constants/urls';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public onUpdateUserDB$$: Subject<void> = new Subject<void>();
  

  constructor(
    private apiService: ApiService
  ) { }


  createUser(user: User): Observable<User> {
    return this.apiService.post<User>(serverEndPoint.user.standartRequest, user)
    .pipe(tap(() => this.onUpdateUserDB$$.next()));
  }

  updateUser(user: User): Observable<User> {
    return this.apiService.put<User>(serverEndPoint.user.standartRequest, user)
    .pipe(tap(() => this.onUpdateUserDB$$.next()));
  }

  deleteUser(user: User): Observable<User> {
    return this.apiService.delete<User>(serverEndPoint.user.standartRequest, user)
    .pipe(tap(() => this.onUpdateUserDB$$.next()));
  }

  getAllUsers() {
    return this.apiService.get<User[]>(serverEndPoint.user.standartRequest)
  }

  getUserByCode(code: string) {
    return this.apiService.post<User | any>(serverEndPoint.user.getUserByCode, { code });
  }

}
