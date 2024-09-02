import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
}

interface UsersState {
    users: User[];
    preUsers: User[];
}
interface SearchType {
    key: keyof User;
    query: string;
}

const initialState: UsersState = {
    users: [],
    preUsers: [],
};

export const fetchUsers = createAsyncThunk('pizzas/fetchPizzaStatus', async () => {
    const { data } = await axios.get<User[]>(`https://66af6590b05db47acc59bae8.mockapi.io/users`);
    return data;
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setSortedType(state, action: PayloadAction<{ sortType: keyof User }>) {
            state.users = state.users.sort((a, b) => {
                const valueA = a[action.payload.sortType];
                const valueB = b[action.payload.sortType];
                if (typeof valueA === 'string' && typeof valueB === 'string') {
                    return valueA.localeCompare(valueB);
                }
                return 0;
            });
            state.preUsers = state.users;
        },
        setSearchedArray(state, action: PayloadAction<SearchType>) {
            const { key, query } = action.payload;

            if (query === '') {
                state.users = state.preUsers;
            } else {
                state.users = state.preUsers.filter((item: User) =>
                    item[key].toString().toLowerCase().startsWith(query.toLowerCase()),
                );
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
            state.preUsers = action.payload;
        });
    },
});

export const { setSortedType, setSearchedArray } = usersSlice.actions;
export default usersSlice.reducer;
