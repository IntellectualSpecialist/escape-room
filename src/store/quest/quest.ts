import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { fetchQuestAction } from '../api-actions';
import { QuestData } from '../../types';

const initialState: QuestData = {
  quest: null,
  requestStatus: RequestStatus.Idle
};

export const quest = createSlice({
  name: NameSpace.Quest,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuestAction.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchQuestAction.fulfilled, (state, action) => {
        state.quest = action.payload;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchQuestAction.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  }
});
