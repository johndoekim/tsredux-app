import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const initialState = [
    { id: '1', title: 'first post!', content: 'hello' },
    { id: '2', title: 'second post', content: 'more text' },
];

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded(state, action) {
            state.push(action.payload);
        },
    },
});

export const postCount = (state: RootState) => state.posts;

export const { postAdded } = postsSlice.actions;

export default postsSlice.reducer;
