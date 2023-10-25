import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAdded, reactionAdded } from './postsSlice';
import { nanoid } from '@reduxjs/toolkit';
import { usersCount } from './usersSlice';

export const AddPostForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [userId, setUserId] = useState('');

    const users = useSelector(usersCount);
    const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);
    const onAuthorChangeed = (e: React.ChangeEvent<HTMLSelectElement>) => setUserId(e.target.value);
    const dispatch = useDispatch();

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

    const usersOptions = users.map((user) => (
        <option
            key={user.id}
            value={user.id}
        >
            {user.name}
        </option>
    ));

    const onSavePostCliked = () => {
        if (title && content) {
            dispatch(postAdded(title, content, userId));
            setTitle('');
            setContent('');
        }
    };

    return (
        <>
            <h2>add new page</h2>

            <form>
                <label htmlFor="postTitle">Post Title</label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author : </label>
                <select
                    id="postAuthor"
                    value={userId}
                    onChange={onAuthorChangeed}
                >
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChanged}
                />
                <button
                    type="button"
                    onClick={onSavePostCliked}
                    disabled={!canSave}
                >
                    Save Post
                </button>
            </form>
        </>
    );
};
