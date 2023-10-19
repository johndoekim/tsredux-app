import { useSelector } from 'react-redux';
import { postCount } from './postsSlice';

export interface PostState {
    status: 'idle' | 'loading' | 'failed';
}

export const PostsList: React.FC = () => {
    const posts = useSelector(postCount);

    const renderedPosts = posts.map((post) => (
        <article
            className="post-excerpt"
            key={post.id}
        >
            <h3>{post.title}</h3>
            <p className="post-content">{post.content.substring(0, 100)}</p>
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
