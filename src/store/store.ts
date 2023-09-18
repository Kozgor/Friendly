import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './slices';

const { addUser, removeUser } = userSlice.actions;
const store = configureStore({
  reducer: userSlice.reducer
});

export { addUser, removeUser };
export default store;
