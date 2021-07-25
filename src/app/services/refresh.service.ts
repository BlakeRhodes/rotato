import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  private displayRefresh: Subject<void> = new Subject();
  private boardRefresh: Subject<void> = new Subject();

  constructor() { }

  triggerDisplayRefresh(): void {
    this.displayRefresh.next();
  }

  triggerBoardRefresh(): void {
    this.boardRefresh.next();
  }

  onDisplayRefresh(): Observable<void> {
    return this.displayRefresh.asObservable();
  }

  onBoardRefresh(): Observable<void> {
    return this.boardRefresh.asObservable();
  }
}
