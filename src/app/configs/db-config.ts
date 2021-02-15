import {DBConfig} from 'ngx-indexed-db';
import {TEAM_BOARDS_KEY} from '../utillity/constants';

export const dbConfig: DBConfig = {
  name: 'rotato',
  version: 1,
  objectStoresMeta: [{
    store: TEAM_BOARDS_KEY,
    storeConfig: {keyPath: 'id', autoIncrement: true},
    storeSchema: [
      {name: 'name', keypath: 'name', options: {unique: true}},
      {name: 'state', keypath: 'state', options: {unique: false}},
    ]
  }]
};
