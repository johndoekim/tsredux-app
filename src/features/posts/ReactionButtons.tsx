import { useDispatch } from 'react-redux';
import { Reaction, reactionAdded } from './postsSlice';

const reactionEmoji = {
    thumbsUp: '👍',
    hooray: '🎉',
    heart: '❤️',
    rocket: '🚀',
    eyes: '👀',
};

export const ReactionButtons = ({ post }: any) => {
    const dispatch = useDispatch();

    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
            <button
                key={name}
                type="button"
                className="muted-button reaction-button"
                onClick={() => dispatch(reactionAdded({ postId: post.id, reaction: name as Reaction }))}
            >
                {emoji} {post.reactions[name]}
            </button>
        );
    });

    return <div>{reactionButtons}</div>;
};
