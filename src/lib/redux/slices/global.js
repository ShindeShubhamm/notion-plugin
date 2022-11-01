import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    snackbar: {
        show: false,
        message: '',
        type: '', // success, error, warning, info
    },
    backdrop: false,
};

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        showSnackbar: (state, action) => {
            const { payload } = action;
            state.snackbar = {
                show: true,
                message: payload.message,
                type: payload.type || 'success',
            };
        },
        closeSnackbar: (state) => {
            state.snackbar = {
                ...state.snackbar,
                show: false,
            };
        },
        showBackdrop: (state) => {
            state.backdrop = true;
        },
        hideBackdrop: (state) => {
            state.backdrop = false;
        },
    },
});

export const { showSnackbar, closeSnackbar, showBackdrop, hideBackdrop } =
    globalSlice.actions;

export default globalSlice.reducer;
