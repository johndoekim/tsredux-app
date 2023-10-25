import { useSelector } from 'react-redux';
import usersSlice, { usersCount } from './usersSlice';
import { RootState } from '../../app/store';

export const PostAuthor = ({ userId }: any) => {
    const author = useSelector((state: RootState) => state.users.find((user) => user.id === userId));

    return <span>by {author ? author.name : 'Unknown author'}</span>;
};
