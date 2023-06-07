import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ApplicationStateService } from 'src/app/services/application-state.service';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss']
})
export class SignInFormComponent {


     hasSentRequest: boolean = false;

    code: FormControl = new FormControl()
   
  constructor(
    public authorizationService: AuthorizationService,
    public applicationStateService: ApplicationStateService
  ) {
  }

  get showNotFoundError() {
    return this.hasSentRequest && !this.applicationStateService.user;
  }

  resetSentRequest() {
    this.hasSentRequest = false;
  }

  authorize() {
    this.authorizationService.authorize(this.code.value, () => this.hasSentRequest = true);
    this.code.reset();
  }

}
