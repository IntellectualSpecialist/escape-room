import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, Place, LoginFormData, PageQuest, Quest, State, UserData, BookingFormData, ReservationQuest } from '../types';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { removeToken, saveToken } from '../services';

export const fetchQuestsAction = createAsyncThunk<Quest[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchQuests',
  async (_args, {extra: api}) => {
    const {data} = await api.get<Quest[]>(APIRoute.Quest);

    return data;
  }
);

export const fetchQuestAction = createAsyncThunk<PageQuest, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchQuest',
  async (id, {extra: api}) => {
    const {data} = await api.get<PageQuest>(`${APIRoute.Quest}/${id}`);

    return data;
  }
);

export const fetchPlacesAction = createAsyncThunk<Place[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchPlaces',
  async (id, {extra: api}) => {
    const {data} = await api.get<Place[]>(`${APIRoute.Quest}/${id}${APIRoute.Booking}`);

    return data;
  }
);

export const postBookingAction = createAsyncThunk<void, {formData: BookingFormData; offerId: string}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postBooking',
  async ({formData, offerId}, {extra: api}) => {
    await api.post(`${APIRoute.Quest}/${offerId}${APIRoute.Booking}`, formData);
  }
);

export const fetchReservationAction = createAsyncThunk<ReservationQuest[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReservation',
  async (_args, {extra: api}) => {
    const {data} = await api.get<ReservationQuest[]>(APIRoute.Reservation);

    return data;
  }
);

export const deleteReservationAction = createAsyncThunk<string, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/deleteReservation',
  async (id, {extra: api}) => {
    await api.delete(`${APIRoute.Reservation}/${id}`);

    return id;
  }
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_args, { extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);

    return data;
  }
);

export const loginAction = createAsyncThunk<UserData, LoginFormData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async (loginForm, { extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, loginForm);
    saveToken(data.token);

    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_args, { extra: api}) => {
    await api.delete(APIRoute.Logout);
    removeToken();
  }
);
