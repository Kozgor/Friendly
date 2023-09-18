import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootStateInterface } from './interfaces';

import { IUserProfile } from '../interfaces/user';

const initialState: RootStateInterface = {
    user: {
        fullName: '',
        _id: '',
        avatar: '',
        role: '',
        email: '',
        description: '',
        createdAt: '',
        updatedAt: '',
        __v: 0,
        token: ''
    }
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    addUser: (state, action: PayloadAction<IUserProfile>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
        state.user = initialState.user;
    }
  }
});
