import {Component} from '@angular/core';
import {ThemeService} from '../services/theme.service';
import {THEME_KEY} from '../utillity/constants';
import {Theme} from '../utillity/theme';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  themes: Theme[] = [
    { sheet: 'light', name: 'Mashed'},
    { sheet: 'classic', name: 'Fried'},
    { sheet: 'dark', name: 'Baked'},
    { sheet: 'black', name: 'Burnt'},
    { sheet: 'purple', name: 'Vitelotte'},
    { sheet: 'tan', name: 'Raw'},
    { sheet: 'orange', name: 'Sweet'},
  ];
  constructor(
    private themeService: ThemeService,
  ) {
  }

  getBackground(): string {
    return this.themeService.getBackground();
  }

  setTheme(theme: string): void {
    localStorage.setItem(THEME_KEY, theme);
  }
}
