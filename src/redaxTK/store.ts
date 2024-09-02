import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import usersSlice from './slices/usersSlice';

export const store = configureStore({
    reducer: { users: usersSlice},
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
