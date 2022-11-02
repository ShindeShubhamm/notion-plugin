import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    closeSnackbar,
    hideBackdrop,
    showBackdrop,
    showSnackbar,
} from './global';

const server = process.env.REACT_APP_SERVER_URL;

const initialState = {
    notionData: null,
};

export const fetchNotionData = createAsyncThunk(
    'notion/fetchNotionData',
    async (code, { dispatch }) => {
        dispatch(showBackdrop());
        dispatch(showSnackbar({ message: 'Fetching Data', type: 'info' }));
        try {
            const response = await axios.post(`${server}/accesstoken`, {
                code,
            });
            localStorage.setItem('notion', JSON.stringify(response.data));
            dispatch(hideBackdrop());
            dispatch(closeSnackbar());
            return response;
        } catch (error) {
            return null;
        }
    }
);

export const notionSlice = createSlice({
    name: 'notion',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchNotionData.fulfilled, (state, action) => {
            state.notionData = action.payload.data;
        });
    },
});

export default notionSlice.reducer;
