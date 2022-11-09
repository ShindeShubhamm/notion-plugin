import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { hideBackdrop, showBackdrop, showSnackbar } from './global';

const server = process.env.REACT_APP_SERVER_URL;

const initialState = {
    notionData: null,
    pageData: [], // blocks of the page
    tableData: null,
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

const getTableFormattedData = (notionTable) => {
    const formattedRows = {};

    for (let i = 0; i < notionTable.length; i++) {
        const {
            table_row: { cells },
        } = notionTable[i];
        const formattedCells = {};
        for (let j = 0; j < cells.length; j++) {
            const { plain_text } = cells[j][0];
            formattedCells[j + 1] = {
                text: plain_text,
            };
        }
        formattedRows[i + 1] = {
            cells: formattedCells,
        };
    }
    console.log(formattedRows);
    return {
        name: 'sheet2',
        freeze: 'A1',
        styles: [],
        merges: [],
        // rows: {
        //     1: {
        //         cells: {
        //             2: {
        //                 text: 'sdfsa',
        //             },
        //         },
        //     },
        //     len: 100,
        // },
        rows: { ...formattedRows },
        cols: {
            // len: 26,
        },
        validations: [],
        autofilter: {},
    };
};

export const fetchPageData = createAsyncThunk(
    'notion/fetchPageData',
    async (pageId, { dispatch, getState }) => {
        const {
            notion: { notionData },
        } = getState();
        dispatch(showBackdrop());
        try {
            const response = await axios.get(
                `${server}/block_content/${pageId}/children`,
                {
                    headers: {
                        Authorization: `Bearer ${notionData.access_token}`,
                    },
                }
            );
            const tableData = response.data.find(
                (data) => data.type === 'table'
            );

            const childResponse = await axios.get(
                `${server}/block_content/${tableData.id}/children`,
                {
                    headers: {
                        Authorization: `Bearer ${notionData.access_token}`,
                    },
                }
            );

            const tableFormattedData = getTableFormattedData(
                childResponse.data
            );
            console.log(tableFormattedData);
            dispatch(hideBackdrop());
            return tableFormattedData;
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
            state.tableData = action.payload;
        });
    },
});

export const { populateNotionData } = notionSlice.actions;
export default notionSlice.reducer;
