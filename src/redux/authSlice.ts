import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from './store';
import { auth } from '../firebase';

interface AuthState {
  user: null | { email: string; uid: string };
  loading: boolean;
  error: null | string;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<{ email: string; uid: string }>) => {
      state.user = action.payload;
      state.loading = false;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const login = (email: string, password: string): AppThunk => {
    return async (dispatch) => {
      dispatch(loginStart());
      try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        if (user) {
          dispatch(loginSuccess({ email: user.email!, uid: user.uid }));
        }
      } catch (error:any) {
        dispatch(loginFailure(error.message));
      }
    };
  };
  
  export const signOut = (): AppThunk => {
    return async (dispatch) => {
      try {
        await auth.signOut();
        dispatch(logout());
      } catch (error) {
        console.error("Error signing out: ", error);
      }
    };
  };

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
