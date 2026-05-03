import { Date } from '../const';
import { Location } from './location';
import { Quest } from './quest';

export type ReservationQuest = {
  date: Date;
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
  id: string;
  location: Location;
  quest: Quest;
}
