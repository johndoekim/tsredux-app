import { useDispatch, useSelector } from 'react-redux';
import { Post, fetchPosts, postCount, postUpdated, selectAllPosts } from './postsSlice';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';
import { RootState } from '../../app/store';
import { useEffect } from 'react';
import { Spinner } from '../../app/Spinner';
import axios from 'axios';
import { client } from '../../api/client';

interface Props {
    post: Post;
}

const PostExcerpt = ({ post }: Props) => {
    return (
        <article className="post-excerpt">
            <h3>{post.title}</h3>
            <div>
                <PostAuthor userId={post.user} />
                <TimeAgo timeStamp={post.date} />
            </div>
            <p className="post-content">{post.content.substring(0, 100)}</p>
            <ReactionButtons post={post} />
            <Link
                to={`/posts/${post.id}`}
                className="button muted-button"
            >
                View Post
            </Link>
        </article>
    );
};

export const PostsList: React.FC = () => {
    const dispatch = useDispatch();
    const posts = useSelector(selectAllPosts);

    const postStatus = useSelector((state: RootState) => state.posts.status);
    const error = useSelector((state: RootState) => state.posts.error);

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);

    let content;

    if (postStatus === 'loading') {
        content = <Spinner text="Loading..." />;
    } else if (postStatus === 'succeeded') {
        const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date));

        content = orderedPosts.map((post) => (
            <PostExcerpt
                key={post.id}
                post={post}
            />
        ));
    } else if (postStatus === 'failed') {
        content = <div>{error}</div>;
    }

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
                {content}
            </section>
        </>
    );
};
