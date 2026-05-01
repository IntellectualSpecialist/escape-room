import { AuthorizationStatus } from '../const';
import { Quest, ReservationQuest } from '../types';

const authorizationStatus = AuthorizationStatus.Auth;

const isAuth = (authStatus: AuthorizationStatus): boolean => authStatus === AuthorizationStatus.Auth;

const isReservationQuest = (quest: Quest | ReservationQuest): quest is ReservationQuest => 'date' in quest && 'time' in quest && 'location' in quest;

export {isAuth, authorizationStatus, isReservationQuest};
