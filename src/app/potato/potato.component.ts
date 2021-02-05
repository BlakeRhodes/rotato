import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-potato',
  templateUrl: './potato.component.html',
  styleUrls: ['./potato.component.css']
})
export class PotatoComponent{
  @Input() shouldISpinAPotato = true;
  showToys = false;
  constructor() {
  }
}
