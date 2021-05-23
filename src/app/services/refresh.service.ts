import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  private refresh: Subject<void> = new Subject();

  constructor() { }

  triggerRefresh(): void {
    this.refresh.next();
  }

  onRefresh(): Observable<void> {
    return this.refresh.asObservable();
  }
}
