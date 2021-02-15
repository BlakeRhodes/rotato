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

  getColor(number: number): string {
    const theme = localStorage.getItem(THEME_KEY);
    return `${theme}-color-${number}`;
  }

  getSelected(): string{
    const theme = localStorage.getItem(THEME_KEY);
    return `${theme}-selected`;
  }

  getBackground(number: number): string {
    const theme = localStorage.getItem(THEME_KEY);
    return `${theme}-background-${number}`;
  }

  getLabel(): string {
    const theme = localStorage.getItem(THEME_KEY);
    return `${theme}-label`
  }

  getInput(): string {
    const theme = localStorage.getItem(THEME_KEY);
    return `${theme}-input`
  }

  getFormColor(): string {
    const theme = localStorage.getItem(THEME_KEY);
    return `${theme}-form`;
  }

  getTab(): string {
    const theme = localStorage.getItem(THEME_KEY);
    return `${theme}-tab`;
  }
}
