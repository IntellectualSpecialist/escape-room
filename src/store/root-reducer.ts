import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { quests } from './quests/quests';
import { user } from './user/user';
import { quest } from './quest/quest';
import { booking } from './booking/booking';

const rootReducer = combineReducers({
  [NameSpace.Quests]: quests.reducer,
  [NameSpace.User]: user.reducer,
  [NameSpace.Quest]: quest.reducer,
  [NameSpace.Booking]: booking.reducer,
});

export { rootReducer };
