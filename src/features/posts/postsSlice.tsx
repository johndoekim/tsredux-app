import { createSlice, nanoid } from '@reduxjs/toolkit';
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
        postUpdated(state, action) {
            const { id, title, content } = action.payload;
            const existingPost = state.find((post) => post.id === id);
            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        },
    },
});

export const postCount = (state: RootState) => state.posts;

export const { postAdded, postUpdated } = postsSlice.actions;

export default postsSlice.reducer;
