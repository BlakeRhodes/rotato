import {ListType} from './list-type';

export const DELETE_BUTTON_TEXT = 'PEEL';
export const APP_NAME = 'Rotato';
export const THEME_KEY = 'theme';
export const CURRENT_DATA_VERSION = '1.2.0';
export const TEAM_BOARDS_KEY = 'team-boards';
export const BACK_BURNER_MESSAGE = 'Double Click to move to Back Burner';
export const DOUBLE_CLICK_MESSAGE = 'Double Click to Carry';
export const DEV_KEY = 'devs';
export const DISABLED_DEV_KEY = 'disabled';
export const BOARDS_KEY = 'boards';
export const DISABLED_BOARDS_KEY = 'disabledBoards';
export const DEV_TYPE: ListType = {
  listKey: DEV_KEY,
  disabledKey: DISABLED_DEV_KEY,
  typeName: 'Dev',
  label: 'Chef\'s Name',
  iconOn: 'person',
  iconOff: 'person_off',
};

export const BOARD_TYPE: ListType = {
  listKey: BOARDS_KEY,
  disabledKey: DISABLED_BOARDS_KEY,
  typeName: 'Board',
  label: 'Cutting Board Name',
  iconOn: 'label',
  iconOff: 'label_off'
};
