import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { hideBackdrop, showBackdrop, showSnackbar } from './global';

const server = process.env.REACT_APP_SERVER_URL;

const initialState = {
    notionData: null,
    pageData: null,
    searchResult: null,
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
            dispatch(
                showSnackbar({
                    message: 'Authorization Successful',
                    type: 'success',
                })
            );
            return response;
        } catch (error) {
            dispatch(hideBackdrop());
            return null;
        }
    }
);

export const fetchPageData = createAsyncThunk(
    'notion/fetchPageData',
    async (pageId, { dispatch, getState }) => {
        const {
            notion: { notionData },
        } = getState();
        dispatch(showBackdrop());
        try {
            const response = await axios.get(`${server}/pagedata/${pageId}`, {
                headers: {
                    Authorization: `Bearer ${notionData.access_token}`,
                },
            });
            dispatch(hideBackdrop());
            return response;
        } catch (error) {
            dispatch(hideBackdrop());
            return null;
        }
    }
);

export const searchNotionData = createAsyncThunk(
    'notion/searchNotionData',
    async (params, { dispatch, getState }) => {
        const {
            notion: { notionData },
        } = getState();
        dispatch(showBackdrop());
        try {
            const response = await axios.get(`${server}/search`, {
                headers: {
                    Authorization: `Bearer ${notionData.access_token}`,
                },
            });
            dispatch(hideBackdrop());
            return response;
        } catch (error) {
            dispatch(hideBackdrop());
            return null;
        }
    }
);

export const notionSlice = createSlice({
    name: 'notion',
    initialState,
    reducers: {
        populateNotionData: (state, action) => {
            state.notionData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNotionData.fulfilled, (state, action) => {
            state.notionData = action.payload?.data;
        });
        builder.addCase(fetchPageData.fulfilled, (state, action) => {
            state.pageData = action.payload?.data;
        });
        builder.addCase(searchNotionData.fulfilled, (state, action) => {
            state.searchResult = action.payload?.data;
        });
    },
});

export const { populateNotionData } = notionSlice.actions;
export default notionSlice.reducer;
