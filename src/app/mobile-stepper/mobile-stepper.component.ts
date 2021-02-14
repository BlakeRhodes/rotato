import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-mobile-stepper',
  templateUrl: './mobile-stepper.component.html',
  styleUrls: ['./mobile-stepper.component.scss']
})
export class MobileStepperComponent implements OnInit {
  @Output() taterSpinningTime: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

  handleSpin($event: any) {
    this.taterSpinningTime.emit($event);
  }
}
