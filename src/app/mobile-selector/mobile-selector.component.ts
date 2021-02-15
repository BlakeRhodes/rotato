import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ThemeService} from '../services/theme.service';

@Component({
  selector: 'app-mobile-stepper',
  templateUrl: './mobile-selector.component.html',
  styleUrls: ['./mobile-selector.component.scss']
})
export class MobileSelectorComponent implements OnInit {
  @Output() taterSpinningTime: EventEmitter<any> = new EventEmitter<any>();
  currentIndex = 0;

  constructor(
    private themeService: ThemeService,
  ) {
  }

  ngOnInit(): void {
  }

  handleSpin($event: any): void {
    this.taterSpinningTime.emit($event);
  }

  getBackground(): string {
    return this.themeService.getBackground(1);
  }

  handleRight(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  handleLeft(): void {
    if (this.currentIndex < 2) {
      this.currentIndex++;
    }
  }
}
