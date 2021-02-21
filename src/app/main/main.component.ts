import { Component, OnInit } from '@angular/core';
import {ScreenType} from '../utillity/enums';
import {ThemeService} from '../services/theme.service';
import {MediaQueryService} from '../services/media-query.service';
import {delay} from '../utillity/lulz';
import {ListType} from '../utillity/list-type';
import {BOARD_TYPE, DEV_TYPE} from '../utillity/constants';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  spin = false;
  screenType: ScreenType;
  dev: ListType = DEV_TYPE;

  board: ListType = BOARD_TYPE;

  constructor(
    private themeService: ThemeService,
    private mediaQueryService: MediaQueryService,

  ) {
  }

  ngOnInit(): void {
    this.mediaQueryService.screenType.subscribe(screenType => this.screenType = screenType);
  }

  handleTheSpinningPotato(): void {
    (async () => {
      this.spin = true;
      await delay(500);
      this.spin = false;
    })();
  }

  getBackground(): string {
    return this.themeService.getBackground();
  }

  isDesktop(): boolean {
    return this.screenType === ScreenType.Desktop;
  }

}
