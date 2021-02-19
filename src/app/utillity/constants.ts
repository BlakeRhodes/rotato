import {environment} from '../../environments/environment';
import {ListType} from './list-type';

export const DELETE_BUTTON_TEXT = 'PEEL';
export const APP_NAME = 'Rotato';
export const THEME_KEY = 'theme';
export const CURRENT_DATA_VERSION = '1.0.0.0';
export const TEAM_BOARDS_KEY = 'team-boards';
export const BACK_BURNER_MESSAGE = 'Double Click to move to Back Burner';
export const DOUBLE_CLICK_MESSAGE = 'Double Click to Carry';
export const HOST = environment.production ? 'https://rotato.dev/' : 'http://localhost:4200/';
export const DEV_TYPE: ListType = {
  listKey: 'devs',
  disabledKey: 'disabled',
  typeName: 'Dev',
  label: 'Chef\'s Name'
};

export const BOARD_TYPE: ListType = {
  listKey: 'boards',
  disabledKey: 'disabledBoards',
  typeName: 'Board',
  label: 'Cutting Board Name',
};
