import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { MenuOption } from 'src/app/interfaces/options';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  currentActiveIndex: number = 0;

  @Input() listItems: MenuOption[] = [];


  /**
   *
   */
  constructor(
    public modalService: ModalService
  ) {
  }
  ngOnInit(): void {
    this.currentActiveIndex = this.listItems.findIndex(x => x.isDefault);

    if (this.currentActiveIndex === -1) {
       this.currentActiveIndex = 0; 
    }

  }


  onItemClick(option: MenuOption) {
    this.currentActiveIndex = this.listItems.indexOf(option);
    option.onClickAction(null);
  }


  isActive(option: MenuOption) {
    return this.currentActiveIndex === this.listItems?.indexOf(option);
  }

}
