import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { switchMap, tap } from 'rxjs';
import { CookingPlace, Role, RolesOptions, User } from 'src/app/interfaces/user';
import { ModalService } from 'src/app/services/modal.service';
import { UserService } from 'src/app/services/user.service';
import { Option } from '../../../interfaces/options';
import { convertCookingPlaceFromEngToUa } from 'src/app/utils/utils';

@UntilDestroy()
@Component({
  selector: 'app-employee-managaging',
  templateUrl: './employee-managaging.component.html',
  styleUrls: ['./employee-managaging.component.scss']
})
export class EmployeeManagagingComponent implements OnInit {
  
  users: User[] = []
  displayedColumns: string[] = [ 'name', 'surname', 'role','cookingPlace', 'code' ,'edit', 'delete'];

  manageForm: FormGroup = new FormGroup({
    search: new FormControl(''),
    role: new FormControl(null)  
  })

  public rolesOptions: Option<any, string>[] = []; 
  
  get displayedUsers() {
    return this.users.filter(user => {

      const generalString = user.name + ' ' + user.surname + ' ' + this.convertRoleFromEngToUa(user.role) + ' ' + convertCookingPlaceFromEngToUa(user.cookingPlace);
      const searchValue = this.manageForm.controls['search'].value;
      const filteredRole = this.manageForm.controls['role'].value;
      const filterRole = !filteredRole? true : user.role === filteredRole;

      return generalString.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) && filterRole;
    }).sort((a, b) => a.name.localeCompare(b.name))
  }

  constructor(
    private userService: UserService,
    public modalService: ModalService ) {
  }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(users => this.users = users);

    this.userService.onUpdateUserDB$$
      .pipe(
        untilDestroyed(this),
        switchMap(() => this.userService.getAllUsers()))
      .subscribe((users => this.users = users));


      this.rolesOptions = RolesOptions;
      // this.rolesOptions.unshift({
      //   value: null, 
      //   displayValue: 'Усі'
      // })

  }

  onEditEmployee(user: User) {
    this.modalService.openAddNewEmployeeModal(user);
  }

  onDeleteEmployee(user: User) {
    this.userService.deleteUser(user).subscribe((data)=>console.log('removed', data));
  }

  convertRoleFromEngToUa(role: Role) {
    switch(role) {
        case Role.ADMIN: 
        return 'Адміністратор';
        case Role.COOK:
            return 'Кухар';
        case Role.WAITER: 
        return 'Офіціан'; 
    }
}

convertingCookingPlaceFromEngToUa = convertCookingPlaceFromEngToUa;
}
