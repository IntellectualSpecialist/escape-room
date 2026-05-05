import { store } from '../store';
import { AuthorizationStatus, RequestStatus } from '../const';
import { Quest } from './quest';
import { PageQuest } from './page-quest';
import { Place } from './place';

export type QuestsData = {
  quests: Quest[];
  requestStatus: RequestStatus;
};

export type QuestData = {
  quest: PageQuest | null;
  requestStatus: RequestStatus;
};

export type BookingData = {
  places: Place[];
  requestStatus: RequestStatus;
  requestFormStatus: RequestStatus;
};

export type UserProcessData = {
  authorizationStatus: AuthorizationStatus;
  requestStatus: RequestStatus;
};

export type State = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
