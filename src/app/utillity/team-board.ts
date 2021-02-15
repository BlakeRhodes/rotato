import {CURRENT_DATA_VERSION} from './constants';
import {Pair} from './pair';

export class TeamBoard {
  name: string;
  version: string = CURRENT_DATA_VERSION;
  devs: string[];
  pairs: Pair[];
  carriers: string[];
  disabled: string[];
  boards: string[];
  disabledBoards: string[];
  sticking: Pair[];
}
