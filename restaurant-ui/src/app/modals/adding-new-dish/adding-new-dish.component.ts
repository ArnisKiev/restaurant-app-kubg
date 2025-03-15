import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { get } from 'lodash';
import { Images } from 'src/app/constants/images';
import { ComponentDish, Dish } from 'src/app/interfaces/dish';
import { CookingPlace, CookingPlaceOptions } from 'src/app/interfaces/user';
import { DishService } from 'src/app/services/dish.service';
import { faImage } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-adding-new-dish',
  templateUrl: './adding-new-dish.component.html',
  styleUrls: ['./adding-new-dish.component.scss']
})
export class AddingNewDishComponent implements OnInit {


  cookingPlaceOptions = CookingPlaceOptions;
  public dishComponents: ComponentDish[] = [];
  dish: Dish = null;

  imageIcon = faImage;
   _file: any = null;

  public dishForm: FormGroup = new FormGroup({
    title: new FormControl(),
    description: new FormControl(),
    cookingTime: new FormControl(15),
    price: new FormControl(0, [Validators.min(0)]),
    cookingPlace: new FormControl('KITCHEN', [Validators.required])
  })

  public componentForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    weight: new FormControl(0, [Validators.min(0)])
  })


  constructor(
    private dishService: DishService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddingNewDishComponent>
  ) {
    this.dish = data.dish;
  }


  selectedImage: string | ArrayBuffer = null;

  onImageInit(event) {
    this._file = event.target.files[0];

    const reader = new FileReader();

    reader.onload = (e) => {
      this.selectedImage = e.target.result;
      console.log(this.selectedImage)
    }

    reader.readAsDataURL(this._file);

  }

  ngOnInit(): void {


    if (this.dish) {
      Object.keys(this.dish).forEach(key => {
        if (this.dishForm.contains(key)) {
          this.dishForm.controls[key].setValue(get(this.dish, key));
        }
      })

      if(this.dish.components?.length) {
        this.dishComponents = this.dish.components;
      }

    }

    



  }


  public onAddComponent() {
    if (this.componentForm.valid) {
      const component: ComponentDish = this.componentForm.value;
  
      this.dishComponents.push(component);
      this.componentForm.reset();
    }    
  }


  public onCreateDish() {

    const dish: Dish = {
      ...this.dishForm.value,
      components: this.dishComponents,
    }

    const formData = new FormData();


    formData.append('file', this._file);


    if (!this.dish) {
      formData.append('dish', JSON.stringify(dish));
      this.dishService.createDish(formData).subscribe(res => {
      })
      this.dialogRef.close();
      return;
    }


    const updatedDish = Object.assign(this.dish, dish);
   
    
    formData.append('dish', JSON.stringify(updatedDish));

    const hj = formData.getAll('dish');
    debugger
    this.dishService.updateDish(formData).subscribe();
    this.dialogRef.close();

  }

  public onDeleteComponent(component: ComponentDish) {
    const index = this.dishComponents.indexOf(component);
    this.dishComponents.splice(index, 1);
  }

  get image() {
    return Images[this.dishForm.controls['cookingPlace'].value as CookingPlace]
  }
  

}
