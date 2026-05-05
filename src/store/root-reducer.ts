import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { quests } from './quests/quests';
import { user } from './user/user';

const rootReducer = combineReducers({
  [NameSpace.Quests]: quests.reducer,
  [NameSpace.User]: user.reducer,
});

export { rootReducer };
