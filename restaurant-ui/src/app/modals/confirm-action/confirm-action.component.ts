import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-action',
  templateUrl: './confirm-action.component.html',
  styleUrls: ['./confirm-action.component.scss']
})
export class ConfirmActionComponent {

  question: string;
  onActionConfirm: () => void;

  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmActionComponent>
  ) {
    
    this.question = data.question;
    this.onActionConfirm = data.onActionConfirm;
  }

  onConfirmClick() {
    this.onActionConfirm();
    this.dialogRef.close();
  }

}
