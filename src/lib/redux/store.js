import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import globalSlice from './slices/global';

const middleware = [thunk];

export const store = configureStore({
    reducer: {
        global: globalSlice,
    },
    middleware,
});
