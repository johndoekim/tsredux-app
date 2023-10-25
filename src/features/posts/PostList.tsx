import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, postCount, postUpdated, selectAllPosts } from './postsSlice';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';
import { RootState } from '../../app/store';
import { useEffect } from 'react';

export interface PostState {
    status: 'idle' | 'loading' | 'failed';
}

export const PostsList: React.FC = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts);

    const postStatus = useSelector((state: RootState) => state.posts.status);

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);

    console.log(postUpdated({ id: '123', title: 'first', content: 'some text' }));

    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

    const renderedPosts = orderedPosts.map((post) => (
        <article
            className="post-excerpt"
            key={post.id}
        >
            <h3>{post.title}</h3>
            <PostAuthor userId={post.user} />
            <TimeAgo timestamp={post.date} />
            <p className="post-content">{post.content.substring(0, 100)}</p>
            <ReactionButtons post={post} />
            <Link
                to={`/posts/${post.id}`}
                className="button muted-button"
            >
                View Post
            </Link>
        </article>
    ));

    return (
        <>
            <section className="posts-list">
                <h2>Posts</h2>
                {renderedPosts}
            </section>
        </>
    );
};
