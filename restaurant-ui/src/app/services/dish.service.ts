import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { serverEndPoint } from '../constants/urls';
import { Dish } from '../interfaces/dish';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(
    private apiService: ApiService 
  ) { }


  public onUpdateOperationDB$$: Subject<void> = new Subject<void>();

  public createDish(dish: Dish | FormData) {
    return this.apiService.post<Dish | FormData>(serverEndPoint.dish, dish)
    .pipe(tap(()=>this.onUpdateOperationDB$$.next()));
  }

  public getAllDishes() {
    return this.apiService.get<Dish[]>(serverEndPoint.dish)
  }

  public updateDish(dish: Dish | FormData) {
    return this.apiService.put<Dish | FormData>(serverEndPoint.dish, dish)
    .pipe(tap(()=>this.onUpdateOperationDB$$.next()));
  }

  public deleteDish(dish: Dish) {
    return this.apiService.delete(serverEndPoint.dish, dish)
    .pipe(tap(()=>this.onUpdateOperationDB$$.next()));
  }



}
