import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { quests } from './quests/quests';
import { user } from './user/user';
import { quest } from './quest/quest';

const rootReducer = combineReducers({
  [NameSpace.Quests]: quests.reducer,
  [NameSpace.User]: user.reducer,
  [NameSpace.Quest]: quest.reducer,
});

export { rootReducer };
