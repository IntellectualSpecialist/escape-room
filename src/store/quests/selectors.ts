import { NameSpace } from '../../const';
import { State } from '../../types';

export const selectQuests = (state: Pick<State, NameSpace.Quests>) => state[NameSpace.Quests].quests;
export const selectQuestsStatus = (state: Pick<State, NameSpace.Quests>) => state[NameSpace.Quests].requestStatus;
