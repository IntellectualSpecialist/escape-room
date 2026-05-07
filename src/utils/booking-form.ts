import { Date } from '../const';
import { BookingFormData } from '../types';

const convertTime = (day: Date, value: string) => `${day}${value.replace(':', 'h')}m`;

const converTimeReverse = (value: string): Pick<BookingFormData, 'date' | 'time'> => {
  const date: Date = value.indexOf('tomorrow') !== -1 ? 'tomorrow' : 'today';
  const time = value.slice(-6, -1).replace('h', ':');

  return {date, time};
};

const getBookingDataProperties = (name: keyof Omit<BookingFormData, 'placeId'>, value: string, checked: boolean): Partial<BookingFormData> => {
  switch (name) {
    case 'peopleCount':
      return {peopleCount: Number(value)};
    case 'withChildren':
      return {withChildren: checked};
    case 'date':
      return {...converTimeReverse(value)};
    default:
      return {[name]: value};
  }
};

export {convertTime, getBookingDataProperties};
