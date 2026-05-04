import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../../const';
import { fetchQuestsAction } from '../api-actions';
import { QuestsData } from '../../../types';

const initialState: QuestsData = {
  quests: [],
  status: RequestStatus.Idle
};

export const quests = createSlice({
  name: NameSpace.Quests,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchQuestsAction.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(fetchQuestsAction.fulfilled, (state, action) => {
        state.quests = action.payload;
        state.status = RequestStatus.Success;
      })
      .addCase(fetchQuestsAction.rejected, (state) => {
        state.status = RequestStatus.Failed;
      });
  }
});
