import { Component, Input } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() tableNumber: number = 8;
  @Input() order: any = null;

  constructor(
    public modalService: ModalService
  ) {
  }

  public onOpenCreatingOrderModal() {
    this.modalService.openCreatingTableOrderModal({
      table: this.tableNumber,
      order: this.order
    });
  }

}
