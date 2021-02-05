import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-potato',
  templateUrl: './potato.component.html',
  styleUrls: ['./potato.component.css']
})
export class PotatoComponent implements OnInit {
  @Input() shouldISpinAPotato = true;
  showToys = false;
  constructor() {
  }

  ngOnInit(): void {
  }
}
