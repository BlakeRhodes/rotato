import {HammerGestureConfig} from '@angular/platform-browser';
import * as Hammer from 'hammerjs';
import {Injectable} from '@angular/core';

@Injectable()
export class HammerConfiguration extends HammerGestureConfig {
  overrides = {
    swipe: {direction: Hammer.DIRECTION_ALL},
  } as any;
}
