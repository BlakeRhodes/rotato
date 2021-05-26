import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { BOARD_TYPE, DEV_TYPE } from '../utillity/constants';
import { ListType } from '../utillity/list-type';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent {
  type: ListType;
  name: string;
  placeholder: string;
  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.type = data.type;
      this.name = data.name;
      this.placeholder = this.getThatSweetEmojiPlaceholder(data.type);
    }

  handleCancel(): void {
    this.dialogRef.close();
  }

  private getThatSweetEmojiPlaceholder(type: ListType): string {
    switch (type) {
      case DEV_TYPE:
        return '✏️🧑‍🍳';
      case BOARD_TYPE:
        return '✏️🍽️';
      default:
        return '';
    }
  }
}
