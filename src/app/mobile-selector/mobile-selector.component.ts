import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ThemeService} from '../theme.service';

@Component({
  selector: 'app-mobile-stepper',
  templateUrl: './mobile-selector.component.html',
  styleUrls: ['./mobile-selector.component.scss']
})
export class MobileSelectorComponent implements OnInit {
  @Output() taterSpinningTime: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private themeService: ThemeService,
  ) { }

  ngOnInit(): void {
  }

  handleSpin($event: any) {
    this.taterSpinningTime.emit($event);
  }

  getBackground(): string{
    return this.themeService.getBackground(1)
  }
}
