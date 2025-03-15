import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { interval, timeout } from 'rxjs';
import { OrderedDish } from 'src/app/interfaces/dish';
import { ModalService } from 'src/app/services/modal.service';

@UntilDestroy()
@Component({
  selector: 'app-cook-card',
  templateUrl: './cook-card.component.html',
  styleUrls: ['./cook-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CookCardComponent implements OnInit {

  @Input() orderedDish: OrderedDish;
  @Input() onClickCardAction: ()=> void;
  @Input() hasOnCardClickAction: boolean = false;

  private blockOnClickCardEvent: boolean = false;

  public timeOut: Date;


  constructor(
    private cdr: ChangeDetectorRef,
    private modalService: ModalService
  ) {
  }


  onClickCard() {

    if (this.blockOnClickCardEvent) {
      this.blockOnClickCardEvent = false;
      return;
    }
    this.onClickCardAction();
  }

  onInfoClick() {
    this.modalService.openDishInfoModal(this.orderedDish);
    this.blockOnClickCardEvent = true;
  }

  get styles() {
    return {
      'cursor': (this.hasOnCardClickAction? 'pointer' : 'default' )
    }
  }


  ngOnInit(): void {
    
    this.timeOut = new Date(this.orderedDish.orderTime?.toString());
    const timeoutMinutes = this.timeOut.getMinutes() + (this.orderedDish.cookingTime) 
    this.timeOut.setMinutes(timeoutMinutes);


    interval(1000)
    .pipe(untilDestroyed(this))
    .subscribe(() => this.cdr.detectChanges())

  }

  get displayRemainingTime() {
    return this.timeOut.getTime() - Date.now();
  }

  get cardModificator() {
    
    const seconds = new Date(this.displayRemainingTime).getSeconds();
    const cookingTime = this.orderedDish.cookingTime * 60;

    console.log(cookingTime)
    console.log(seconds)


    return {
      'cook-card_yellow':  seconds >= (cookingTime / 3) && seconds < (cookingTime * 2 / 3),
      'cook-card_red':  seconds <  (cookingTime / 3) || this.timeOut.getTime() < Date.now(),
      'cook-card_green': seconds >= (cookingTime * 2 / 3),
    }
  }




}
