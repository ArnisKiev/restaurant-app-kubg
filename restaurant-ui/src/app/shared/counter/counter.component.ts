import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent {

  @Input() count: number;

  @Input() disabled: boolean;
  @Input() min: number = null;

  @Output() onIncrease: EventEmitter<number> = new EventEmitter<number>();
  @Output() onDecrease: EventEmitter<number> = new EventEmitter<number>();

  @Output() countChange: EventEmitter<number> = new EventEmitter<number>();

  @HostBinding('class.disabled')
  get isDisabled() {
    return this.disabled;
  }
  

  increase() {
    this.count++;
    this.onIncrease.emit(this.count);
    this.countChange.emit(this.count);
  }

  decrease() {

    if (this.min !== null) {

      if (this.count - 1 < this.min) {
        this.count = this.min;
        return;
      }

    }

    this.count--;
    this.onDecrease.emit(this.count);
    this.countChange.emit(this.count);
  }


}
