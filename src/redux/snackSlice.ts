import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SnackState {
  message: string;
  open: boolean;
  severity: 'success' | 'info' | 'warning' | 'error' | undefined;
}

const initialState: SnackState = {
  message: '',
  open: false,
  severity: undefined,
};

const snackSlice = createSlice({
  name: 'snack',
  initialState,
  reducers: {
    setSnack: (state, action: PayloadAction<Omit<SnackState, 'open'>>) => {
      console.log(action.payload);
      state.message = action.payload.message;
      state.severity = action.payload.severity;
      state.open = true;
    },
    closeSnack: (state) => {
      state.open = false;
    },
  },
});

export const { setSnack, closeSnack } = snackSlice.actions;
export default snackSlice.reducer;