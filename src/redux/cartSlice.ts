import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from '../types/IProduct';
import { setSnack } from './snackSlice';

interface CartState {
  items: IProduct[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<IProduct>) => {
      // Logic to add item to cart
      const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += action.payload.quantity;
        // Dispatch setSnack action when the quantity of an existing item is updated
        setSnack({
          message: `Quantity of ${action.payload.name} in cart updated`,
          severity: 'info',
        });
      } else {
        state.items.push(action.payload);
        // Dispatch setSnack action when a new item is added to the cart
        setSnack({
          message: `${action.payload.name} added to cart`,
          severity: 'success',
        });
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateItemQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
