import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postAdded } from './postsSlice';
import { nanoid } from '@reduxjs/toolkit';

export const AddPostForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

    const dispatch = useDispatch();

    const onSavePostCliked = () => {
        if (title && content) {
            dispatch(
                postAdded({
                    id: nanoid(),
                    title,
                    content,
                })
            );
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
                >
                    Save Post
                </button>
            </form>
        </>
    );
};
