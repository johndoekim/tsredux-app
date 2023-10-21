import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { PostsList } from './features/posts/PostList';
import { AddPostForm } from './features/posts/AddPostForm';
import { BrowserRouter, Route, Router, Switch } from 'react-router-dom';
import { SinglePostPage } from './features/posts/SinglePostPage';
import { EditPostForm } from './features/posts/EditPostForm';

function App() {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route
                        exact
                        path="/"
                        component={PostsList}
                    />
                    <Route
                        exact
                        path="/"
                        component={AddPostForm}
                    />
                    <Route
                        exact
                        path="/posts/:postId"
                        component={SinglePostPage}
                    />
                    <Route
                        exact
                        path={'editPost/:postId'}
                        component={EditPostForm}
                    />
                </Switch>
            </BrowserRouter>
        </>
    );
}

export default App;
