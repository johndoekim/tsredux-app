import { createSlice, nanoid } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { timeStamp } from 'console';
import { sub } from 'date-fns';
import type { PayloadAction } from '@reduxjs/toolkit';

export type Reaction = 'thumbsUp' | 'hooray' | 'heart' | 'rocket' | 'eyes';

interface ReactionAddedAction {
    postId: string;
    reaction: Reaction;
}

const initialState = [
    {
        id: '1',
        title: 'first post!',
        content: 'hello',
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        user: 1,
        reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
    },
    {
        id: '2',
        title: 'second post',
        content: 'more text',
        date: sub(new Date(), { minutes: 5 }).toISOString(),
        user: 1,
        reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
    },
];

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reactionAdded(state, action: PayloadAction<ReactionAddedAction>) {
            const { postId, reaction } = action.payload;
            const existingPost = state.find((post) => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        },

        postAdded: {
            reducer: (state, action) => {
                state.push(action.payload);
            },
            prepare(title, content, userId, date?, user?) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId,
                    },
                    meta: {},
                    error: false,
                };
            },
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

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;
