import { NameSpace } from '../../const';
import { State } from '../../types';

export const selectPlaces = (state: Pick<State, NameSpace.Booking>) => state[NameSpace.Booking].places;
export const selectPlacesRequestStatus = (state: Pick<State, NameSpace.Booking>) => state[NameSpace.Booking].requestStatus;
export const selectPlacesRequestFormStatus = (state: Pick<State, NameSpace.Booking>) => state[NameSpace.Booking].requestFormStatus;
