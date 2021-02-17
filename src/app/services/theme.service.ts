import {Injectable} from '@angular/core';
import {THEME_KEY} from '../utillity/constants';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() {
  }

  getTheme(): string {
    return localStorage.getItem(THEME_KEY);
  }

  getColor(value: number): string {
    const theme = localStorage.getItem(THEME_KEY);
    return `${theme}-color-${value}`;
  }

  getSelected(): string{
    const theme = localStorage.getItem(THEME_KEY);
    return `${theme}-selected`;
  }

  getBackground(value: number): string {
    const theme = localStorage.getItem(THEME_KEY);
    return `${theme}-background-${value}`;
  }

  getLabel(): string {
    const theme = localStorage.getItem(THEME_KEY);
    return `${theme}-label`;
  }

  getInput(): string {
    const theme = localStorage.getItem(THEME_KEY);
    return `${theme}-input`;
  }

  getFormColor(): string {
    const theme = localStorage.getItem(THEME_KEY);
    return `${theme}-form`;
  }

  getTab(): string {
    const theme = localStorage.getItem(THEME_KEY);
    return `${theme}-tab`;
  }

  getSharedPage(): string {
    const theme = localStorage.getItem(THEME_KEY);
    return `${theme}-shared-page`;
  }
}
