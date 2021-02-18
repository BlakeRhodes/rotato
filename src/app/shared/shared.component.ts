import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../services/local-storage.service';
import {DecodeService} from '../services/decode.service';
import {ThemeService} from '../services/theme.service';
import {SaveDialogComponent} from '../save-dialog/save-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {SoundService} from '../services/sound.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit {
  rawLink: string;
  boardName: string;

  constructor(
    private route: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private decodeService: DecodeService,
    private router: Router,
    private themeService: ThemeService,
    private dialog: MatDialog,
    private soundService: SoundService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.rawLink = params.board;

    });
  }

  handleNo(): void {
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

  handleCancel(): void {
    this.router.navigate(['/']).then();
  }

  getBackground(): string {
    return this.themeService.getSharedPage();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SaveDialogComponent, {
      width: '250px',
      data: this.boardName
    });

    dialogRef.afterClosed().subscribe(result => {
      this.boardName = result;
      this.localStorageService.saveState(this.boardName)
        .add(() => this.localStorageService.getTeamBoards()
          .subscribe(
            () => {
              this.openSnackBar(`${this.boardName} was saved.`, '🥔🥔🥔🥔');
              this.soundService.heyListen();
              this.router.navigate(['/']).then();
            }
          )
        );
    });
  }

  private openSnackBar(message: string, action: string): void {
    this.snackbar.open(message, action, {
      duration: 2000,
    });
  }
}
