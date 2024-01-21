import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { auth } from '../firebase';

interface User {
  id: string;
  email: string;
  isAdmin: boolean;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    login: (state: UserState, action: PayloadAction<{ email: string, password: string }>): any => {
      return async (dispatch: any): Promise<void> => {
        dispatch(loginStart());
        try {
          const { email, password } = action.payload;
          await auth.signInWithEmailAndPassword(email, password);
          const user = auth.currentUser;
          if (user) {
            dispatch(loginSuccess({ id: user.uid, email: user.email!, isAdmin: true })); // Simplified for this example
          }
        } catch (error: unknown) {
          dispatch(loginFailure(error as string));
        }
      };
    },
    logout: (state) => {
      auth.signOut();
      state.user = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    }
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = userSlice.actions;
export default userSlice.reducer;
