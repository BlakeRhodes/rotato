import {Injectable} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {BehaviorSubject} from 'rxjs';
import {ScreenType} from './enums';

@Injectable({
  providedIn: 'root'
})
export class MediaQueryService {
  screenType = new BehaviorSubject<ScreenType>(null);

  constructor(
    private breakpointObserver: BreakpointObserver,
  ) {
    this.breakpointObserver.observe([
      Breakpoints.Web,
      Breakpoints.Tablet,
      Breakpoints.Handset,
    ]).subscribe(result => {
      console.log(result.breakpoints);
      if (result.breakpoints['(min-width: 1280px) and (orientation: landscape)']) {
        this.screenType.next(ScreenType.Desktop);
      } else if (result.breakpoints['(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)']){
        this.screenType.next(ScreenType.Tablet);
      } else if (result.breakpoints['(max-width: 599.98px) and (orientation: portrait)']) {
        this.screenType.next(ScreenType.Mobile);
      }
    });
  }
}
