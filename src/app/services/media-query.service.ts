import {Injectable} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {BehaviorSubject} from 'rxjs';
import {ScreenType} from '../utillity/enums';

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
      if (result.breakpoints['(min-width: 1280px) and (orientation: landscape)']) {
        this.screenType.next(ScreenType.Desktop);
      } else {
        this.screenType.next(ScreenType.Mobile);
      }
    });
  }
}
