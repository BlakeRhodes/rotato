import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-screenshot',
  templateUrl: './screenshot.component.html',
  styleUrls: ['./screenshot.component.scss']
})
export class ScreenshotComponent {
  image: string;

  constructor(
    private dialogRef: MatDialogRef<ScreenshotComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.image = data.image;
  }

  getImage(): string{
    return this.image;
  }

}
