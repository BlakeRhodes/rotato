import {Component, Input} from '@angular/core';
import {APP_NAME} from '../utillity/constants';
import {ThemeService} from '../services/theme.service';

@Component({
  selector: 'app-potato',
  templateUrl: './potato.component.html',
  styleUrls: ['./potato.component.scss']
})
export class PotatoComponent {
  @Input() shouldISpinAPotato = true;
  showToys = false;
  appName = APP_NAME;
  toys = [
    'hat',
    'brows',
    'eye',
    'moustache',
    'nose',
    'small_nose',
    'small_nose_alt',
    'nose_alt',
    'mouth',
    'mouth_red'
  ];
  flipped = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];

  constructor(
      private themeService: ThemeService,
  ) {
  }

  isFlipped(i: number): boolean {
    return this.flipped[i];
  }

  flip(i: number): void {
    this.flipped[i] = !this.flipped[i];
  }

  getStyle(): string {
    return this.themeService.getHeader();
  }
}
