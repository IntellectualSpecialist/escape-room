import { NameSpace } from '../../const';
import { State } from '../../types';

export const selectQuest = (state: Pick<State, NameSpace.Quest>) => state[NameSpace.Quest].quest;
export const selectQuestStatus = (state: Pick<State, NameSpace.Quest>) => state[NameSpace.Quest].requestStatus;
