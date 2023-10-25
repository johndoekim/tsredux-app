import { RouteComponentProps, useHistory } from 'react-router-dom';
import { MatchParmas } from './SinglePostPage';
import { useDispatch, useSelector } from 'react-redux';
import { postCount, postUpdated, selectPostById } from './postsSlice';
import { useState } from 'react';
import { RootState } from '../../app/store';

export const EditPostForm: React.FC<RouteComponentProps<MatchParmas>> = ({ match }) => {
    const { postId } = match.params;
    const post = useSelector((state: RootState) => selectPostById(state, postId));

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();

    const onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
    const onContentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value);

    const onSavePostClicked = () => {
        if (title && content) {
            dispatch(postUpdated({ id: postId, title, content }));
            history.push(`/posts/${postId}`);
        }
    };
    return (
        <>
            <section>
                <h2>edit posts</h2>
                <form>
                    <label htmlFor="postTitle">Post Title;</label>
                    <input
                        type="text"
                        id="postTitle"
                        name="postTitle"
                        placeholder="hey write down something here"
                        value={title}
                        onChange={onTitleChanged}
                    />
                    <label htmlFor="postContent">Content :</label>
                    <textarea
                        id="postContent"
                        name="postContent"
                        value={content}
                        onChange={onContentChanged}
                    />
                </form>
                <button
                    type="button"
                    onClick={onSavePostClicked}
                >
                    save post
                </button>
            </section>
        </>
    );
};
