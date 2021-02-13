import {Component, Input} from '@angular/core';
import {APP_NAME} from '../constants';
import {ThemeService} from '../theme.service';

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

  isFlipped(i: number) {
    return this.flipped[i];
  }

  flip(i: number) {
    this.flipped[i] = !this.flipped[i];
  }

  getColor() {
    return this.themeService.getColor(2);
  }

  getBackground() {
    return this.themeService.getBackground(3);
  }
}
