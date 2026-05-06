import { NameSpace } from '../../const';
import { State } from '../../types';

export const selectReservation = (state: Pick<State, NameSpace.Reservation>) => state[NameSpace.Reservation].reservation;
export const selectReservationStatus = (state: Pick<State, NameSpace.Reservation>) => state[NameSpace.Reservation].requestStatus;
