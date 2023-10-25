import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const initialState = [
    { id: '0', name: 'Tianna' },
    { id: '1', name: 'Kevin' },
    { id: '2', name: 'Madison' },
];

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
});
export const usersCount = (state: RootState) => state.users;

export default usersSlice.reducer;
