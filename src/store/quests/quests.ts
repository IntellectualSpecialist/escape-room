import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { fetchQuestsAction } from '../api-actions';
import { QuestsData } from '../../types';

const initialState: QuestsData = {
  quests: [],
  requestStatus: RequestStatus.Idle
};

export const quests = createSlice({
  name: NameSpace.Quests,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuestsAction.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchQuestsAction.fulfilled, (state, action) => {
        state.quests = action.payload;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchQuestsAction.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  }
});
