import {Component, Input, OnInit} from '@angular/core';
import {APP_NAME} from '../utillity/constants';
import {ThemeService} from '../services/theme.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-mobile-potato',
  templateUrl: './mobile-potato.component.html',
  styleUrls: ['./mobile-potato.component.scss']
})
export class MobilePotatoComponent implements OnInit {
  @Input() shouldISpinAPotato: boolean;
  appName = APP_NAME;
  potatoPath: string;
  private potatoPathSubscription: Subscription;

  constructor(
    private themeService: ThemeService,
  ) {}

  ngOnInit(): void {
    this.potatoPathSubscription = this.themeService.mobilePotatoPath$
      .subscribe(path => this.potatoPath = path);
  }

  getStyle(): string {
    return this.themeService.getHeader();
  }
}
