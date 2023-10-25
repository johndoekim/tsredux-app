import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { timeStamp } from 'console';
import { sub } from 'date-fns';
import type { PayloadAction } from '@reduxjs/toolkit';
import { client } from '../../api/client';

export type Reaction = 'thumbsUp' | 'hooray' | 'heart' | 'rocket' | 'eyes';

interface ReactionAddedAction {
    postId: string;
    reaction: Reaction;
}
interface Post {
    id: string;
    title: string;
    content: string;
    user: number;
    date: string;
    reactions: Record<Reaction, number>;
}

export type apiStatus = {
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
};

const initialState: { posts: Post[]; status: apiStatus['status']; error: apiStatus['error'] } = {
    posts: [],
    status: 'idle',
    error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await client.get('/fakeApi/posts');
    return response.data;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        reactionAdded(state, action: PayloadAction<ReactionAddedAction>) {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find((post) => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        },

        postAdded: {
            reducer: (state, action) => {
                state.posts.push(action.payload);
            },
            prepare(title, content, userId, date?, user?) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userId,
                        reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
                    },
                    meta: {},
                    error: false,
                };
            },
        },
        postUpdated(state, action) {
            const { id, title, content } = action.payload;
            const existingPost = state.posts.find((post) => post.id === id);
            if (existingPost) {
                existingPost.title = title;
                existingPost.content = content;
            }
        },
    },
});

export const postCount = (state: RootState) => state.posts;

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export const selectAllPosts = (state: RootState) => state.posts.posts;

export const selectPostById = (state: RootState, postId: string) =>
    state.posts.posts.find((post: any) => post.id === postId);

export default postsSlice.reducer;
