import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { quests } from './quests/quests';

const rootReducer = combineReducers({
  [NameSpace.Quests]: quests.reducer,
});

export { rootReducer };
