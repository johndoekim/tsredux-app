import { useSelector } from 'react-redux';
import { postCount, selectPostById } from './postsSlice';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ReactionButtons } from './ReactionButtons';
import { RootState } from '../../app/store';

export interface MatchParmas {
    postId: string;
}

export const SinglePostPage: React.FC<RouteComponentProps<MatchParmas>> = ({ match }) => {
    const { postId } = match.params;

    const post = useSelector((state: RootState) => selectPostById(state, postId));

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
