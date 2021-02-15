import {Component, OnInit} from '@angular/core';
import {ThemeService} from '../services/theme.service';
import {THEME_KEY} from '../utillity/constants';
import {Theme} from '../utillity/theme';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  themes: Theme[] = [
    { sheet: 'light', name: 'Mashed'},
    { sheet: 'classic', name: 'Fried'},
    { sheet: 'dark', name: 'Baked'},
    { sheet: 'black', name: 'Burnt'},
  ];
  constructor(
    private themeService: ThemeService,
  ) {
  }

  ngOnInit(): void {
  }

  getBackground(): string {
    return this.themeService.getBackground(1);
  }

  setTheme(theme: string): void {
    localStorage.setItem(THEME_KEY, theme);
  }
}
