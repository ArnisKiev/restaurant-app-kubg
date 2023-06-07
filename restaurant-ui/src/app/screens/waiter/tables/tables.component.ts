import { Component } from '@angular/core';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent {


  getGridArea(index: number) {
    return  {
      'grid-area': `table-${index + 1}`
    }
  }
}
