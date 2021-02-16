import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../services/local-storage.service';
import {DecodeService} from '../services/decode.service';
import {ThemeService} from '../services/theme.service';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {
  rawLink: string;

  constructor(
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private decodeService: DecodeService,
    private router: Router,
    private themeService: ThemeService,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.rawLink = params.board;

    });
  }

  handleYes(): void {
    const board = this.decodeService.decode(this.rawLink);
    this.localStorageService.setDevs(board.devs);
    this.localStorageService.setPairs(board.pairs);
    this.localStorageService.setCarriers(board.carriers);
    this.localStorageService.setDisabled(board.disabled);
    this.localStorageService.setBoards(board.boards);
    this.localStorageService.setDisabledBoards(board.disabledBoards);
    this.localStorageService.setSticking(board.sticking);
    this.router.navigate(['/']).then();
  }

  handleNo(): void {
    this.router.navigate(['/']).then();
  }

  getBackground(): string {
    return this.themeService.getBackground(2);
  }
}
