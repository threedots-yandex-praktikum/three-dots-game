import { format } from 'date-fns';

export const getDateString = (time: number): string => {
  return format(time, 'dd.MM.yyyy HH:mm');
};
