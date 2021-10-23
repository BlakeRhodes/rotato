import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  private displayRefresh: Subject<void> = new Subject();
  private listRefresh: Subject<void> = new Subject();

  constructor() { }

  triggerDisplayRefresh(): void {
    this.displayRefresh.next();
  }

  onDisplayRefresh(): Observable<void> {
    return this.displayRefresh.asObservable();
  }

  triggerListRefresh(): void {
    this.listRefresh.next();
  }

  onListRefresh(): Observable<void> {
    return this.listRefresh.asObservable();
  }
}
