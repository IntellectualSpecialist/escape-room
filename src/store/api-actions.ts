import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, Quest, State } from '../types';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';

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
