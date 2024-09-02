import { FC } from 'react';
import { User } from '../../../redaxTK/slices/usersSlice';

type SortListT = {
    id: string;
    name: string;
    username: string;
    email: string;
    phone: string;
};

interface MyPopUpProps {
    popupRef: React.RefObject<HTMLDivElement>;
    handleSortChange: (newSortType: keyof User) => void;
    sortListType: SortListT;
}

const PopUp: FC<MyPopUpProps> = ({ popupRef, handleSortChange, sortListType }) => {
    const sortList: Array<keyof User> = ['name', 'username', 'email', 'phone', 'id'];

    return (
        <div ref={popupRef} className='container__sort-list'>
            {sortList.map((item, i) => (
                <li
                    className='container__sort-item'
                    key={i}
                    onClick={() => handleSortChange(sortList[i])}
                >
                    {sortListType[item]}
                </li>
            ))}
        </div>
    );
};

export default PopUp;
