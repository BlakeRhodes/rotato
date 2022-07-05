import { CURRENT_DATA_VERSION, THEME_KEY } from "../utillity/constants";
import { LocalStorageService } from "./local-storage.service";
import * as faker from 'faker';
import { when } from 'jest-when';

describe('LocalStorageService', () => {

  const databaseService = {};

  const getItemSpy = jest.spyOn(window.localStorage.__proto__, 'getItem');
  const setItemSpy = jest.spyOn(window.localStorage.__proto__, 'setItem');
  
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('constructor', () => {
    it('should not set anything in local storage when all values are present', () => {
      when(getItemSpy).calledWith(THEME_KEY).mockReturnValue(faker.music.genre);
      when(getItemSpy).calledWith('version').mockReturnValue(CURRENT_DATA_VERSION);
      when(getItemSpy).calledWith('volume').mockReturnValue(faker.datatype.number().toString());
      when(getItemSpy).calledWith('enableSound').mockReturnValue(faker.datatype.boolean().toString());

      new LocalStorageService(databaseService as any);

      expect(setItemSpy).not.toHaveBeenCalled();
    });

    it('should set theme to default value when theme is not present in local storage', () => {
      when(getItemSpy).calledWith(THEME_KEY).mockReturnValue(null);
      when(getItemSpy).calledWith('version').mockReturnValue(CURRENT_DATA_VERSION);
      when(getItemSpy).calledWith('volume').mockReturnValue(faker.datatype.number().toString());
      when(getItemSpy).calledWith('enableSound').mockReturnValue(faker.datatype.boolean().toString());

      new LocalStorageService(databaseService as any);

      expect(setItemSpy).toHaveBeenCalledWith(THEME_KEY, 'classic');
    });

    it('should set volume to default value when volume is not present in local storage', () => {
      when(getItemSpy).calledWith(THEME_KEY).mockReturnValue(faker.music.genre);
      when(getItemSpy).calledWith('version').mockReturnValue(CURRENT_DATA_VERSION);
      when(getItemSpy).calledWith('volume').mockReturnValue(null);
      when(getItemSpy).calledWith('enableSound').mockReturnValue(faker.datatype.boolean().toString());

      new LocalStorageService(databaseService as any);

      expect(setItemSpy).toHaveBeenCalledWith('volume', '.75');
    });

    it('should enable sound when enable sound is not present in local storage', () => {
      when(getItemSpy).calledWith(THEME_KEY).mockReturnValue(faker.music.genre);
      when(getItemSpy).calledWith('version').mockReturnValue(CURRENT_DATA_VERSION);
      when(getItemSpy).calledWith('volume').mockReturnValue(faker.datatype.number().toString());
      when(getItemSpy).calledWith('enableSound').mockReturnValue(null);

      new LocalStorageService(databaseService as any);

      expect(setItemSpy).toHaveBeenCalledWith('enableSound', 'true');
    });

    it('should set version number when version number in local storage does not match', () => {
      when(getItemSpy).calledWith(THEME_KEY).mockReturnValue(faker.music.genre);
      when(getItemSpy).calledWith('version').mockReturnValue(faker.internet.ip());
      when(getItemSpy).calledWith('volume').mockReturnValue(faker.datatype.number().toString());
      when(getItemSpy).calledWith('enableSound').mockReturnValue(faker.datatype.boolean().toString());

      new LocalStorageService(databaseService as any);

      expect(setItemSpy).toHaveBeenCalledWith('version', CURRENT_DATA_VERSION);
    });

    it('should set allow solo to true when old version is 1.0.0.0', () => {
      when(getItemSpy).calledWith(THEME_KEY).mockReturnValue(faker.music.genre);
      when(getItemSpy).calledWith('version').mockReturnValue('1.0.0.0');
      when(getItemSpy).calledWith('volume').mockReturnValue(faker.datatype.number().toString());
      when(getItemSpy).calledWith('enableSound').mockReturnValue(faker.datatype.boolean().toString());

      new LocalStorageService(databaseService as any);

      expect(setItemSpy).toHaveBeenNthCalledWith(1, 'allowSolo', 'true');
      expect(setItemSpy).toHaveBeenNthCalledWith(2, 'version', CURRENT_DATA_VERSION);
    });
  });
});