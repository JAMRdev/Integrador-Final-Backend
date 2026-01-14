import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ordersService } from '../../services';

export const fetchMyOrders = createAsyncThunk(
    'orders/fetchMyOrders',
    async (_, { rejectWithValue }) => {
        try {
            return await ordersService.getMyOrders();
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState = {
    items: [],
    loading: false,
    error: null,
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        resetOrders: (state) => {
            state.items = [];
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMyOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchMyOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Al cerrar sesión, reseteamos las órdenes
            .addCase('user/logout', (state) => {
                state.items = [];
                state.loading = false;
                state.error = null;
            });
    },
});

export const { resetOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
