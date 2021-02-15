import {Component, Input, OnInit} from '@angular/core';
import {APP_NAME} from '../utillity/constants';
import {ThemeService} from '../services/theme.service';

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

  getColor(): string {
    return this.themeService.getColor(2);
  }

  getBackground(): string {
    return this.themeService.getBackground(3);
  }

}
