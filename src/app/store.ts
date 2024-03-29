import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import postReducer from '../features/posts/postsSlice';
import usersReducer from '../features/posts/usersSlice';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        posts: postReducer,
        users: usersReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
