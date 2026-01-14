import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: JSON.parse(localStorage.getItem('cart')) || [],
    shippingCost: 500,
    isCartOpen: false,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        toggleCart: (state) => {
            state.isCartOpen = !state.isCartOpen;
        },
        addToCart: (state, action) => {
            const newItemId = action.payload._id || action.payload.id;
            const itemExists = state.cartItems.find((item) => (item._id || item.id) === newItemId);
            if (itemExists) {
                itemExists.quantity += 1;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(state.cartItems));
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => (item._id || item.id) !== action.payload);
            localStorage.setItem('cart', JSON.stringify(state.cartItems));
        },
        clearCart: (state) => {
            state.cartItems = [];
            localStorage.setItem('cart', JSON.stringify(state.cartItems));
        },
        incrementQuantity: (state, action) => {
            const item = state.cartItems.find((item) => (item._id || item.id) === action.payload);
            if (item) {
                item.quantity += 1;
                localStorage.setItem('cart', JSON.stringify(state.cartItems));
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.cartItems.find((item) => (item._id || item.id) === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                localStorage.setItem('cart', JSON.stringify(state.cartItems));
            } else if (item && item.quantity === 1) {
                state.cartItems = state.cartItems.filter((i) => (i._id || i.id) !== action.payload);
                localStorage.setItem('cart', JSON.stringify(state.cartItems));
            }
        }
    },
});

export const { toggleCart, addToCart, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = cartSlice.actions;
export default cartSlice.reducer;
