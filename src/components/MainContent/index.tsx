import { FC } from 'react';
import MenuSort from '../UI/MenuSort';
import MenuList from '../UI/MenuList';

const MainContent: FC = () => {
    return (
        <>
            <MenuSort />
            <MenuList/>
        </>
    );
};

export default MainContent;
