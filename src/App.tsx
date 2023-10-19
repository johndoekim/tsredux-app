import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { PostsList } from './features/posts/PostList';
import { AddPostForm } from './features/posts/AddPostForm';

function App() {
    return (
        <>
            <AddPostForm />
            <PostsList />
        </>
    );
}

export default App;
