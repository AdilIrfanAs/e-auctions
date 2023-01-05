import { createSlice } from '@reduxjs/toolkit';
import { LoginUserData } from './../../interfaces-types/auth'

export const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    setUser: (state: LoginUserData[], action) => {
      state.push(action.payload);
    },
    unsetUser: (state: LoginUserData[]) => {
      state.pop();
    }
  }
});

export const { setUser, unsetUser } = userSlice.actions;
export default userSlice.reducer;