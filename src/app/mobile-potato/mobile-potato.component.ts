import {Component, Input, OnInit} from '@angular/core';
import {APP_NAME} from '../utillity/constants';
import {ThemeService} from '../services/theme.service';

@Component({
  selector: 'app-mobile-potato',
  templateUrl: './mobile-potato.component.html',
  styleUrls: ['./mobile-potato.component.scss']
})
export class MobilePotatoComponent {
  @Input() shouldISpinAPotato: boolean;
  appName = APP_NAME;

  constructor(
    private themeService: ThemeService,
  ) {
  }

  getStyle(): string {
    return this.themeService.getHeader();
  }
}
