import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { shareReplay, switchMap, tap } from 'rxjs';
import { Dish } from 'src/app/interfaces/dish';
import { Option } from 'src/app/interfaces/options';
import { CookingPlaceOptions } from 'src/app/interfaces/user';
import { RolesOptions } from 'src/app/interfaces/user';
import { DishService } from 'src/app/services/dish.service';
import { ModalService } from 'src/app/services/modal.service';
import { convertCookingPlaceFromEngToUa } from 'src/app/utils/utils';




@Component({
  selector: 'app-dishes-manage',
  templateUrl: './dishes-manage.component.html',
  styleUrls: ['./dishes-manage.component.scss']
})
export class DishesManageComponent implements OnInit {

  displayedColumns: string[] = [ 'title', 'cookingPlace', 'inStopList' ,'edit', 'delete'];
  allDishes: Dish[] = [];
  cookingPlaces: Option<any, string>[] = CookingPlaceOptions;

  manageForm: FormGroup = new FormGroup({
    search: new FormControl(''),
    cookingPlace: new FormControl(null)  
  })

  /**
   *
   */
  constructor(
    public modalService: ModalService,
    public dishService: DishService
    ) {

  }
  ngOnInit(): void {

    // this.cookingPlaces.push({
    //   displayValue: 'Усі',
    //   value: null
    // });

    this.dishService.getAllDishes().subscribe(dishes => { 
      this.allDishes = dishes
    });

    this.dishService.onUpdateOperationDB$$
    .pipe(switchMap(()=>this.dishService.getAllDishes()))
    .subscribe(dishes => this.allDishes = dishes)

  }


  onStopListChange(newState: any, element: Dish) {

    element.isStopList = newState.checked;

    const formData = new FormData();

    formData.append('dish', JSON.stringify(element));

    this.dishService.updateDish(formData).subscribe();
  } 

  onDeleteClick(dish: Dish){
    this.dishService.deleteDish(dish).subscribe();
  }

  onEditClick(dish: Dish) {
    this.modalService.openAddingDishModal(dish);
  }


  get displayedDishes() {
    return this.allDishes.filter(dish => {
      const generalString = dish.title + ' ' + convertCookingPlaceFromEngToUa(dish.cookingPlace);
      const searchValue = this.manageForm.controls['search'].value;
      const filteredCookingPlace = this.manageForm.controls['cookingPlace'].value;

      const filterCookingPlace = !filteredCookingPlace? true : dish.cookingPlace === filteredCookingPlace;

      return generalString?.toLocaleLowerCase().includes(searchValue?.toLocaleLowerCase()) && filterCookingPlace;
    }).sort((a, b) => a.title?.localeCompare(b.title) ?? 0)
  }

  convertingCookingPlaceFromEngToUa = convertCookingPlaceFromEngToUa;
}
