import { Component, OnInit } from '@angular/core';
import {ThemeService} from '../theme.service';
import {THEME_KEY} from '../constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  constructor(
    private themeService: ThemeService,
  ) {
  }

  ngOnInit(): void {
  }

  getBackground(): string {
    return this.themeService.getBackground(1);
  }

  setTheme(theme: string) {
    localStorage.setItem(THEME_KEY, theme);
  }
}
