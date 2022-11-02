import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import globalSlice from './slices/global';
import notionSlice from './slices/notion';

const middleware = [thunk];

export const store = configureStore({
    reducer: {
        global: globalSlice,
        notion: notionSlice,
    },
    middleware,
});
