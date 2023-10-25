import { useSelector } from 'react-redux';
import { postCount } from './postsSlice';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ReactionButtons } from './ReactionButtons';

export interface MatchParmas {
    postId: string;
}

export const SinglePostPage: React.FC<RouteComponentProps<MatchParmas>> = ({ match }) => {
    const posts = useSelector(postCount);

    const { postId } = match.params;

    const post = useSelector(() => posts.find((post) => post.id === postId));

    if (!post) {
        return (
            <section>
                <h2>Post not found</h2>
            </section>
        );
    }

    return (
        <>
            <section>
                <article className="post">
                    <h2>{post.title}</h2>
                    <p className="post-content">{post.content}</p>
                    <ReactionButtons post={post} />
                    <Link
                        to={`/editPost/${postId}`}
                        className="button"
                    >
                        edit post
                    </Link>
                </article>
            </section>
        </>
    );
};
