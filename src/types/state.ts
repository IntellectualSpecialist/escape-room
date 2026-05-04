import { store } from '../components/store';
import { RequestStatus } from '../const';
import { Quest } from './quest';

export type QuestsData = {
  quests: Quest[];
  status: RequestStatus;
};

export type State = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
