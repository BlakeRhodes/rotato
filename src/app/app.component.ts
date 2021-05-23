import {ApplicationRef, Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {first} from 'rxjs/operators';
import {concat, interval} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}
