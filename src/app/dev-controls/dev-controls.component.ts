import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../local-storage.service';

@Component({
  selector: 'app-dev-controls',
  templateUrl: './dev-controls.component.html',
  styleUrls: ['./dev-controls.component.css']
})
export class DevControlsComponent implements OnInit {
  devs: string[];

  constructor(private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.devs = this.localStorageService.getDevs();
  }

  handleClick(value: string): void {
    if (value !== '') {
      this.localStorageService.addDev(value);
    }
    this.devs = this.localStorageService.getDevs();
  }

  deleteDev(i: number): void {
    this.devs.splice(i, 1);
    this.localStorageService.setDevs(this.devs);
    this.devs = this.localStorageService.getDevs();

  }
}
