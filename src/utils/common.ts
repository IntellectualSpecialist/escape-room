import { AuthorizationStatus } from '../const';
import { Quest, ReservationQuest } from '../types';

const findQuestById = (quests: Quest[], id: string) => quests.find((quest) => quest.id === id);

const isAuth = (authStatus: AuthorizationStatus): boolean => authStatus === AuthorizationStatus.Auth;

const isReservationQuest = (quest: Quest | ReservationQuest): quest is ReservationQuest => 'date' in quest && 'time' in quest && 'location' in quest;

export {isAuth, findQuestById, isReservationQuest};
