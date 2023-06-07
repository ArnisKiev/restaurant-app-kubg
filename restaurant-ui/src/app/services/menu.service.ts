import { Injectable } from '@angular/core';
import { MenuOption } from '../interfaces/options';

@Injectable({
  providedIn: 'root'
})
export class MenuService {


  menuItemes: MenuOption[] = [];

  constructor() { }


  setMenuOptions(options: MenuOption[]) {
    this.menuItemes = options;
  }



}
