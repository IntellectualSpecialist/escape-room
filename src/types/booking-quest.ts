import { Location } from './location';

type Slot = {
  time: string;
  isAvailable: boolean;
}

export type Slots = {
    today: Slot[];
    tomorrow: Slot[];
  }

export type BookingQuest = {
  id: string;
  location: Location;
  slots: Slots;
}

export type BookingQuestShort = Omit<BookingQuest, 'slots'>;
