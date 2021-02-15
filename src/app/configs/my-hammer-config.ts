import {HammerGestureConfig} from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

export class HammerConfiguration extends HammerGestureConfig {
  overrides = <any> {
    swipe: {direction: Hammer.DIRECTION_ALL},
  };
}
