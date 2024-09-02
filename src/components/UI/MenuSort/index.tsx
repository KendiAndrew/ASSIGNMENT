import { FC } from 'react';
import SortItem from '../SortItem';
import SearchItems from '../SearchItem';

export type TSortList = {
    id: string;
    name: string;
    username: string;
    email: string;
    phone: string;
};

const MenuSort: FC = () => {
    const sortList: TSortList = {
        id: 'індексом',
        name: 'іменем',
        username: 'іменем користувача',
        email: 'електронною адресою',
        phone: 'номером телофону',
    };
    return (
        <div className='container__controlpanel'>
            <SortItem sortList={sortList} />
            <SearchItems sortList={sortList} />
        </div>
    );
};

export default MenuSort;
