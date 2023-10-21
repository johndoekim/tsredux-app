import { RouteComponentProps, useHistory } from 'react-router-dom';
import { MatchParmas } from './SinglePostPage';
import { useDispatch, useSelector } from 'react-redux';
import { postCount, postUpdated } from './postsSlice';
import { useState } from 'react';

export const EditPostForm: React.FC<RouteComponentProps<MatchParmas>> = ({ match }) => {
    const { postId } = match.params;
    const posts = useSelector(postCount);

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
                />
            </section>
        </>
    );
};
