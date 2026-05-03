import { Date } from '../const';
import { BookingFormData } from '../types';

const convertTime = (day: Date, value: string) => `${day}${value.replace(':', 'h')}m`;

const converTimeReverse = (value: string): Pick<BookingFormData, 'date' | 'time'> => {
  const date: Date = value.indexOf('tomorrow') !== -1 ? 'tomorrow' : 'today';
  const time = value.slice(-6, -1).replace('h', ':');

  return {date, time};
};

const getBookingDataProperties = (name: string, value: string, checked: boolean): Partial<BookingFormData> => {
  switch (name) {
    case 'tel':
      return {phone: value};
    case 'name':
      return {contactPerson: value };
    case 'person':
      return {peopleCount: Number(value)};
    case 'children':
      return {withChildren: checked};
    case 'date':
      return {...converTimeReverse(value)};
    default:
      return {[name]: value};
  }
};

export {convertTime, getBookingDataProperties};
