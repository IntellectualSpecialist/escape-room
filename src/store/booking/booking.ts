import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { fetchPlacesAction, postBookingAction } from '../api-actions';
import { BookingData } from '../../types';

const initialState: BookingData = {
  places: [],
  requestStatus: RequestStatus.Idle,
  requestFormStatus: RequestStatus.Idle
};

export const booking = createSlice({
  name: NameSpace.Booking,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPlacesAction.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchPlacesAction.fulfilled, (state, action) => {
        state.places = action.payload;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchPlacesAction.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(postBookingAction.pending, (state) => {
        state.requestFormStatus = RequestStatus.Loading;
      })
      .addCase(postBookingAction.fulfilled, (state) => {
        state.requestFormStatus = RequestStatus.Success;
      })
      .addCase(postBookingAction.rejected, (state) => {
        state.requestFormStatus = RequestStatus.Failed;
      });
  }
});
