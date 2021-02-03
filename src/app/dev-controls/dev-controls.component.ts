import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../local-storage.service';
import {YeetService} from '../yeet.service';

@Component({
  selector: 'app-dev-controls',
  templateUrl: './dev-controls.component.html',
  styleUrls: ['./dev-controls.component.css']
})
export class DevControlsComponent implements OnInit {
  devs: string[];
  enableSound = false;

  constructor(
    private localStorageService: LocalStorageService,
    private yeetService: YeetService,
  ) {
  }

  ngOnInit(): void {
    this.devs = this.localStorageService.getDevs();
  }

  handleAdd(value: string): void {
    if (value !== '') {
      this.localStorageService.addDev(value);
    }
    this.devs = this.localStorageService.getDevs();
  }

  handleDelete(i: number): void {
    this.devs.splice(i, 1);
    this.localStorageService.setDevs(this.devs);
    this.devs = this.localStorageService.getDevs();
    if (this.enableSound) {
      this.yeetService.play();
    }
  }
}
