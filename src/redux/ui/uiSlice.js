import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    toasts: [],
    modal: {
        isOpen: false,
        text: '',
        actionType: null,
        payload: null,
    },
    infoModal: {
        isOpen: false,
        text: '',
        type: 'success',
        redirectTo: null
    }
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        addToast: (state, action) => {
            state.toasts.push(action.payload);
        },
        removeToast: (state, action) => {
            state.toasts = state.toasts.filter(toast => toast.id !== action.payload);
        },
        clearToasts: (state) => {
            state.toasts = [];
        },
        openModal: (state, action) => {
            state.modal = {
                isOpen: true,
                text: action.payload.text,
                actionType: action.payload.actionType,
                payload: action.payload.payload || null
            };
        },
        closeModal: (state) => {
            state.modal = { ...state.modal, isOpen: false };
        },
        openInfoModal: (state, action) => {
            state.infoModal = {
                isOpen: true,
                text: action.payload.text,
                type: action.payload.type || 'success',
                redirectTo: action.payload.redirectTo || null
            };
        },
        closeInfoModal: (state) => {
            state.infoModal = { ...state.infoModal, isOpen: false };
        }
    },
});

export const { addToast, removeToast, clearToasts, openModal, closeModal, openInfoModal, closeInfoModal } = uiSlice.actions;
export default uiSlice.reducer;
