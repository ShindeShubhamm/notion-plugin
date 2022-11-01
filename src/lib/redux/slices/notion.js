import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    notionData: null,
};

export const fetchNotionData = createAsyncThunk(
    'notion/fetchNotionData',
    (code) => {
        // return axios.post(
        //     'https://api.notion.com/v1/oauth/token',
        //     {
        //         grant_type: 'authorization_code',
        //         code,
        //         redirect_uri: 'http://localhost:3000',
        //     },
        //     {
        //         headers: {
        //             Authorization: `Bearer ${window.btoa(
        //                 `${process.env.REACT_APP_NOTION_OAUTH_CLIENTID}:${process.env.REACT_APP_NOTION_OAUTH_CLIENTSECRET}`
        //             )}`,
        //             'Content-Type': 'application/json',
        //         },
        //     }
        // );
        return fetch('https://api.notion.com/v1/oauth/token', {
            method: 'POST',
            body: JSON.stringify({
                grant_type: 'authorization_code',
                code,
                redirect_uri: process.env.REACT_APP_REDIRECT_URI,
            }),
            headers: {
                Authorization:
                    'Basic ZmRhZmJlNjItMTdkNC00YzlhLTgzMDgtMzUyOTY0Mjc5OTFjOnNlY3JldF9jYUFsaFF2R2pKc1h4b3FreGhGT0N4WXhHczdqNmtkNjVBSXhvMlJmcWJx',
                'Content-Type': 'application/json',
            },
        })
            .then((response) => JSON.parse(response))
            .catch((error) => {
                console.log(error);
            });
    }
);

export const notionSlice = createSlice({
    name: 'notion',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchNotionData.fulfilled, (state, action) => {
            state.notionData = action.payload;
        });
    },
});

// export const { fetchNotionData } = notionSlice.actions;

export default notionSlice.reducer;
