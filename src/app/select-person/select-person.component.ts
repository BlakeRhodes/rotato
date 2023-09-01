import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-select-person',
  templateUrl: './select-person.component.html',
})
export class SelectPersonComponent {
  message: string;

  constructor(
    private dialogRef: MatDialogRef<SelectPersonComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.message = data.message;
  }
}
