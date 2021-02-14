import {Component, Input, OnInit} from '@angular/core';
import {APP_NAME} from '../constants';
import {ThemeService} from '../theme.service';

@Component({
  selector: 'app-mobile-potato',
  templateUrl: './mobile-potato.component.html',
  styleUrls: ['./mobile-potato.component.scss']
})
export class MobilePotatoComponent implements OnInit {
  @Input() shouldISpinAPotato: boolean;
  appName = APP_NAME;

  constructor(
    private themeService: ThemeService,
  ) {
  }

  ngOnInit(): void {
  }

  getColor() {
    return this.themeService.getColor(2);
  }

  getBackground() {
    return this.themeService.getBackground(3);
  }

}
