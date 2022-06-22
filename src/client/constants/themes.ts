import { TThemeState } from '../store/reducers/themeReducer/types';

export const LIGHT_THEME: TThemeState = {
  theme: 0,
  mainColorText: '#000000',
  secondColorText: '#FFFFFF',
  greenColorText: '#68D391',
  bgColor: '#EDF2F7',
  bgColorSecond: '#E2E8F0', //chakra-colors-gray-200:
  bgColorThird: '#CBD5E0', //chakra-colors-gray-300:
  mainColor: '#805AD5',
  secondBgColor: '#E2E8F0',
};

export const DARK_THEME: TThemeState = {
  theme: 1,
  mainColorText: '#FFFFFF',
  secondColorText: '#000000',
  greenColorText: '#1113CC',
  bgColor: '#414141',
  bgColorSecond: '#121810',
  bgColorThird: '#3B3530', //chakra-colors-gray-300:

  mainColor: '#805A77',
  secondBgColor: '#E2E8FF',
};
