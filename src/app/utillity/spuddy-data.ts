import { Pair } from './pair';

export class SpuddyData {
  pairs: Pair[];
  sticking: Pair[];
  carriers: string[];
  boards: string[];
  disabled: string[];
  disabledBoards: string[];
  availableDevs: string[];

  constructor(
    pairs: Pair[],
    sticking: Pair[],
    carriers: string[],
    boards: string[],
    disabled: string[],
    disabledBoards: string[],
    devs: string[]
  ) {
    this.pairs = pairs;
    this.carriers = carriers;
    this.disabled = disabled;
    this.boards = boards;
    this.disabledBoards = disabledBoards;
    this.sticking = sticking;

    const devsInRotation = pairs.flatMap(x => x.devs);
    this.availableDevs = [];
    for (const dev of devs) {
      if (!devsInRotation.includes(dev) && !disabled.includes(dev)) {
        this.availableDevs.push(dev);
      }
    }
  }
}
