import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, RequestStatus } from '../../const';
import { deleteReservationAction, fetchReservationAction } from '../api-actions';
import { ReservationData } from '../../types';

const initialState: ReservationData = {
  reservation: [],
  requestStatus: RequestStatus.Idle,
  deleteRequestStatus: RequestStatus.Idle,
};

export const reservation = createSlice({
  name: NameSpace.Reservation,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReservationAction.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchReservationAction.fulfilled, (state, action) => {
        state.reservation = action.payload;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchReservationAction.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(deleteReservationAction.pending, (state) => {
        state.deleteRequestStatus = RequestStatus.Loading;
      })
      .addCase(deleteReservationAction.fulfilled, (state, action) => {
        state.reservation = state.reservation.filter((item) => item.id !== action.payload);
        state.deleteRequestStatus = RequestStatus.Success;
      })
      .addCase(deleteReservationAction.rejected, (state) => {
        state.deleteRequestStatus = RequestStatus.Failed;
      });
  }
});
