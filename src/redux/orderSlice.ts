import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../types/IProduct';

interface Order {
  id: string;
  userId: string;
  items: IProduct[];
  total: number;
  date: string;
}

interface OrdersState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    fetchOrdersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      state.loading = false;
    },
    fetchOrdersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchOrdersStart, fetchOrdersSuccess, fetchOrdersFailure } = ordersSlice.actions;
export default ordersSlice.reducer;
