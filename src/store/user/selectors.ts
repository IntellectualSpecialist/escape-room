import { NameSpace } from '../../const';
import { State } from '../../types';

export const selectAuthorizationStatus = (state: Pick<State, NameSpace.User>) => state[NameSpace.User].authorizationStatus;
export const selectUserRequestStatus = (state: Pick<State, NameSpace.User>) => state[NameSpace.User].requestStatus;
