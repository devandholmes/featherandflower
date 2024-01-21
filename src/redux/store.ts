import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import productsReducer from './productSlice';
import cartReducer from './cartSlice';
import ordersReducer from './orderSlice';
import userReducer from './userSlice';
import authReducer from './authSlice';
import categoryReducer from './productCategoriesSlice';
import snackReducer from './snackSlice';


const store = configureStore({
  reducer: {
    products: productsReducer,
    productCategories: categoryReducer,
    cart: cartReducer,
    orders: ordersReducer,
    user: userReducer,
    auth: authReducer,
    snack: snackReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
