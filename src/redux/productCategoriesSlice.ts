import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductCategory } from '../types/IProductCategory';

interface ProductCategoryState {
    productCategories: IProductCategory[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductCategoryState = {
    productCategories: [],
    loading: false,
    error: null,
};

const productCategorySlice = createSlice({
    name: 'productCategories',
    initialState,
    reducers: {
        fetchProductCategoryStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchProductCategorySuccess: (state, action: PayloadAction<IProductCategory[]>) => {
            state.productCategories = action.payload;
            state.loading = false;
        },
        fetchProductCategoryFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchProductCategoryStart, fetchProductCategorySuccess, fetchProductCategoryFailure } = productCategorySlice.actions;
export default productCategorySlice.reducer;
