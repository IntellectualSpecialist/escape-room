import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace, RequestStatus } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { UserProcessData } from '../../types';

const initialState: UserProcessData = {
  authorizationStatus: AuthorizationStatus.Unknown,
  requestStatus: RequestStatus.Idle,
};

export const user = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.requestStatus = RequestStatus.Success;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.requestStatus = RequestStatus.Success;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.requestStatus = RequestStatus.Success;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
