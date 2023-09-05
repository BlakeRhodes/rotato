import {Component, Input, OnInit} from '@angular/core';
import {APP_NAME} from '../utillity/constants';
import {ThemeService} from '../services/theme.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-potato',
  templateUrl: './potato.component.html',
  styleUrls: ['./potato.component.scss']
})
export class PotatoComponent implements OnInit {
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
  potatoPath: string;
  private potatoPathSubscription: Subscription;

  constructor(
      private themeService: ThemeService,
  ) {
  }

  ngOnInit(): void {
    this.potatoPathSubscription = this.themeService.potatoPath$
      .subscribe(path => this.potatoPath = path);
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
