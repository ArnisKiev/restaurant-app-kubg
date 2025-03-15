
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { get } from 'lodash';
import { Observable, Subject, shareReplay, startWith, tap } from 'rxjs';
import { CookingPlaceOptions, Role, RolesOptions, User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-adding-new-employee',
  templateUrl: './adding-new-employee.component.html',
  styleUrls: ['./adding-new-employee.component.scss']
})
export class AddingNewEmployeeComponent implements OnInit {

  public userForm: FormGroup = new FormGroup({
    name: new FormControl(),
    surname: new FormControl(),
    role: new FormControl('ADMIN'), 
    cookingPlace: new FormControl('KITCHEN')
  })


  public user: User;
  

  private _isRequestSending$$: Subject<boolean> = new Subject<boolean>();
  isRequestSending$: Observable<boolean> = this._isRequestSending$$
  .pipe(
    startWith(false),
    shareReplay(1)
  );

  //public isRequestSending: boolean = false;
  public showSuccesContainer: boolean = false;
  public code: string = '';
  public cookingPlaceOptions = CookingPlaceOptions;
  public rolesOptions = RolesOptions;
  public successMessage = '';


  constructor(
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<AddingNewEmployeeComponent>) {  
      this.user = data.user as Omit<User, 'code'>;
  }


  onExitClick() {
    this.dialogRef.close();
  }

  ngOnInit(): void {

    if (this.user) {
      Object.keys(this.user).forEach((key: string) => {
        if (this.userForm?.contains(key)) {
          this.userForm.controls[key].setValue(get(this.user, key));
        }
      });
    }

  }


  onCreateOrUpdate() {

    this._isRequestSending$$.next(true);


    if (!this.user) {
      this.userService.createUser(this.userObject)
        .pipe(tap(() => this._isRequestSending$$.next(false)))
      .subscribe((user: User) => {
      
        this.code = user?.code || '';
        this.showSuccesContainer = true;
        this.successMessage = 'Співробітник додан до бази!';
      });
      return;
    }

    const updatedUser = Object.assign(this.user, this.userObject);

    this.userService.updateUser(updatedUser)
    .pipe(tap(() => this._isRequestSending$$.next(false)))
    .subscribe(() => {
      this.code = '';
      this.showSuccesContainer = true;
      this.successMessage = 'Дані оновленні!';
    });


  }


  get showCookingPlace() {
    return this.userForm.get('role').value === Role.COOK;
  }

  onBackClick() {
    this._isRequestSending$$.next(false);
    this.showSuccesContainer = false;
    this.userForm.reset();
  }


  get userObject(): User {
    

    const user: User = this.userForm.value;

    if (user.role !== Role.COOK) {
      delete user.cookingPlace
    }

    return user;
  }

}
