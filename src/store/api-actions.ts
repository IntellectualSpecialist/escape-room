import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, LoginFormData, PageQuest, Quest, State, UserData } from '../types';
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
